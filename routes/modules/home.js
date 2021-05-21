// 引用 Express 與 Express 路由器
const express = require('express')
const { validationResult } = require('express-validator')
const router = express.Router()
// 引用 Todo model
const ShortUrl = require('../../models/shortUrl')
const urlCodeGenerator = require('../../config/urlCodeGenerator')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const { targetUrl } = req.body

  const error = validationResult(req)
  if (!error.isEmpty()) {
    const [errMsg] = error.array()
    return res.status(422).render('index', { targetUrl, errMsg, isInvalidUrl: true })
  } else {
    const isTargetLinkExist = await ShortUrl.exists({ targetLink: targetUrl })
    if (isTargetLinkExist) {
      return ShortUrl.findOne({ targetLink: targetUrl })
        .lean()
        .then((obj) => {
          const hostname = process.env.PORT ? req.hostname : 'localhost:3000'
          const newLink = `${req.protocol}://${hostname}/to/${obj.shortCode}`
          return res.render('index', { targetUrl, isGenerateSucceed: true, newLink })
        })
        .catch(err => res.render('linkErr', { err }))
    } else {
      const count = await ShortUrl.countDocuments()
      const code = urlCodeGenerator(count)
      return ShortUrl.create({
        targetLink: targetUrl,
        shortCode: code
      })
        .then((obj) => {
          const hostname = process.env.PORT ? req.hostname : 'localhost:3000'
          const newLink = `${req.protocol}://${hostname}/to/${obj.shortCode}`
          return res.render('index', { targetUrl, isGenerateSucceed: true, newLink })
        })
    }
  }
})

// 匯出路由模組
module.exports = router
// 引用 Express 與 Express 路由器
const express = require('express')
const { validationResult } = require('express-validator')
const router = express.Router()
const ShortUrl = require('../../models/shortUrl') // DB
const urlCodeGenerator = require('../../config/urlCodeGenerator') // 短碼產生器 : 內含重複短碼確認
const shortCodeValidator = require('../../middleware/shortCodeIsValid')  // middleware : 防止任意輸入的短碼，一定要是 5 碼才進行 post 流程

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const { targetUrl } = req.body

  const error = validationResult(req) // 無效的 Url 連結錯誤
  if (!error.isEmpty()) {
    const [errMsg] = error.array()
    return res.status(422).render('index', { targetUrl, errMsg, isInvalidUrl: true })
  } else {
    const isTargetLinkExist = await ShortUrl.exists({ targetLink: targetUrl })
    if (isTargetLinkExist) { // 返回已存在於 DB 之 短碼連結
      return ShortUrl.findOne({ targetLink: targetUrl })
        .lean()
        .then((obj) => {
          const hostname = process.env.PORT ? req.hostname : 'localhost:3000'
          const newLink = `${req.protocol}://${hostname}/${obj.shortCode}`
          return res.render('index', { targetUrl, isGenerateSucceed: true, newLink })
        })
        .catch(err => res.render('linkErr', { err }))
    } else { // 創建新的短碼連結, 並存取 Url 至 DB
      do {
        const count = await ShortUrl.countDocuments()
        const code = urlCodeGenerator(count)
        const isShortCodeExist = await ShortUrl.exists({ shortCode: code })
        if (!isShortCodeExist) {
          return ShortUrl.create({
            targetLink: targetUrl,
            shortCode: code
          })
            .then((obj) => {
              const hostname = process.env.PORT ? req.hostname : 'localhost:3000'
              const newLink = `${req.protocol}://${hostname}/${obj.shortCode}`
              return res.render('index', { targetUrl, isGenerateSucceed: true, newLink })
            })
        }
      } while (true)
    }
  }
})

router.get('/:shortCode', shortCodeValidator, async (req, res) => {
  const shortCodeIsValid = res.locals.shortCodeIsValid
  if (!shortCodeIsValid) {
    res.render('linkErr', { err: 'Invalid shortCode : Short Code Must Be 5 Characters!' })
  } else {
    const { shortCode } = req.params
    return ShortUrl.findOne({ shortCode: shortCode })
      .lean()
      .then((obj) => {
        if (!obj) { // not find
          return res.render('linkErr', { err: 'Invalid shortCode : Not in DB!' })
        } else {
          return res.redirect(obj.targetLink)
        }
      })
      .catch(err => res.render('linkErr', { err }))
  }
})

// 匯出路由模組
module.exports = router
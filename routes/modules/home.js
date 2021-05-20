// 引用 Express 與 Express 路由器
const express = require('express')
const { validationResult } = require('express-validator')
const router = express.Router()
// 引用 Todo model
const ShortUrl = require('../../models/shortUrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const { targetUrl } = req.body

  const error = validationResult(req)
  if (!error.isEmpty()) {
    const [errMsg] = error.array()
    return res.status(422).render('index', { targetUrl, errMsg, isInvalidUrl: true })
  }
  res.render('index', { targetUrl })
})

// 匯出路由模組
module.exports = router
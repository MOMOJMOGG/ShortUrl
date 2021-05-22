// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const ShortUrl = require('../../models/shortUrl')
const shortCodeValidator = require('../../middleware/shortCodeIsValid')  // middleware : 防止任意輸入的短碼，一定要是 5 碼才進行 post 流程

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
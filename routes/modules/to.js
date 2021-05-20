// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const ShortUrl = require('../../models/shortUrl')
const shortCodeValidator = require('./shortCodeIsValid')

router.get('/:shortCode', shortCodeValidator, async (req, res) => {
  try {
    const shortCodeIsValid = res.locals.shortCodeIsValid
    if (!shortCodeIsValid) {
      res.render('linkErr', { err: 'Invalid shortCode : Short Code Must Be 5 Characters!' })
    } else {
      const { shortCode } = req.params
      const isShortCodeExist = await ShortUrl.exists({ shortCode: shortCode })
      if (isShortCodeExist) {
        const targetLink = await ShortUrl.findOne({ shortCode: shortCode }).then(obj => { return obj.targetLink }).catch(err => res.render('linkErr', { err }))
        res.redirect(targetLink)
      } else {
        res.render('linkErr', { err: 'Invalid shortCode : Short Code Do Not Existed in DB!' })
      }
    }
  } catch (err) {
    console.log(err)
    res.render('linkErr', { err })
  }
})

// 匯出路由模組
module.exports = router
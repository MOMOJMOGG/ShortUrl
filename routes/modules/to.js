// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const ShortUrl = require('../../models/shortUrl')

router.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params
    console.log(shortCode)
    const targetLink = await ShortUrl.findOne({ shortCode: shortCode }).then(obj => { return obj.targetLink }).catch(err => res.render('linkErr', { err }))
    res.redirect(targetLink)
  } catch (err) {
    console.log(err)
    res.render('linkErr', { err })
  }
})

// 匯出路由模組
module.exports = router
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  targetLink: {
    type: String,
    require: true
  },
  shortCode: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
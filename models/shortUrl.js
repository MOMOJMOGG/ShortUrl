const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  targetLink: {
    type: String,
    require: true,
    unique: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
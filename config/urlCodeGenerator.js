const ShortUrl = require('../models/shortUrl')
const selector = "abcdefghijkmnopqrstuvwxyz023456789ABCDEFGHIJKLMNPQRSTUVWXYZ" // remove 'O', '0', 'l', '1' that easy to confuse

function sample(length) {
  const index = Math.floor(Math.random() * length)
  return index
}

function get_seed(s) {
  s = Math.sin(s) * 10000
  return s - Math.floor(s)
}

async function checkValidCode(code) {
  const isExist = await ShortUrl.exists({ ShortCode: code })
  return isExist
}

function urlCodeGenerator(idx) {
  const seed = get_seed(idx)
  let code = ''
  for (let i = 0; i < 5; i++) {
    const select = Math.floor(seed * sample(selector.length))
    code += selector[select]
  }

  const isExist = checkValidCode(code)
  if (!isExist) {
    return urlCodeGenerator(idx)
  } else {
    return code
  }
}

module.exports = urlCodeGenerator
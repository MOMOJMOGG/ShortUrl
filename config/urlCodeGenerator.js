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
  const seedSelect = Math.floor(seed * selector.length)
  code += selector[seedSelect]
  for (let i = 0; i < 4; i++) {
    const select = sample(selector.length)
    code += selector[select]
  }

  const isExist = checkValidCode(code)
  if (!isExist) {
    return urlCodeGenerator(idx)
  } else {
    return code
  }
}

// module.exports = urlCodeGenerator
console.log(urlCodeGenerator(15))
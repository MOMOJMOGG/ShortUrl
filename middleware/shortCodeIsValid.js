// 防止任意輸入的短碼，一定要是 5 碼才進行 post 流程
const shortCodeValidator = (req, res, next) => {
  const shortCode = req.params.shortCode || ""
  if (shortCode.length !== 5) {
    res.locals.shortCodeIsValid = false
  } else {
    res.locals.shortCodeIsValid = true
  }
  next()
}

module.exports = shortCodeValidator
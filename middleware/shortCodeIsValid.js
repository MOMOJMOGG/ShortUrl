const shortCodeValidator = (req, res, next) => {
  const shortCode = req.params.shortCode || ""
  console.log(req.params)
  if (shortCode.length !== 5) {
    res.locals.shortCodeIsValid = false
  } else {
    res.locals.shortCodeIsValid = true
  }
  next()
}

module.exports = shortCodeValidator
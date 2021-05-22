const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const moment = require('moment')
const { body } = require('express-validator')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {}
}))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}));

// Middleware : 確認輸入為有效的 Url 連結
const urlValidator = body('targetUrl').isURL().withMessage('Invalid Url Format. Please Enter valid Url!')

app.use(urlValidator)
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})
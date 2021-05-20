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

// Middleware
const validator = body('targetUrl').isURL().withMessage('Invalid Url Format. Please Enter valid Url!')


app.use(validator)

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})
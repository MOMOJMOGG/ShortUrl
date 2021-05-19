const ShortUrl = require('../shortUrl') // 載入 ShortUrl model
const { links } = require('./rawData.json') // 載入 links json 資料

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Connected to MongoDB -- Record!')

  ShortUrl.create(links)
    .then(() => {
      console.log('ShortUrl Seeder Creating Finished!')
      return db.close()
    })
    .then(() => console.log('MongoDB Connected Closed!'))
    .catch(error => console.log(error))
})

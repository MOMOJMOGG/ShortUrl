# MO哩 ‧ 短網址產生器 ShortUrl version 1.0

一個基於 Node.js 的 Express 框架練習專案，包含 mongoose 操作, middleware處裡

## 專案畫面 Demo
[<img align="center" src="https://github.com/MOMOJMOGG/ShortUrl/blob/master/public/images/HomePage.png" height="300" width="800" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/ShortUrl/blob/master/public/images/err.png" height="300" width="800" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/ShortUrl/blob/master/public/images/Copy.png" height="300" width="800" />]()

## 功能描述 - Features
- 讀入 Url 網址，並產生短網址連結
  - 合法 Url 檢查處裡
  - 回傳錯誤訊息
  - 一鍵複製短網址連結到剪貼簿


## 環境建置需求與套件版本 - Prerequisies & Package Version
- 開發平台: [Visual Studio Code](https://code.visualstudio.com/download)
- 開發環境: [Node.js](https://nodejs.org/en/) - v10.15.0
- 開發框架: [Express](https://expressjs.com/en/starter/installing.html) - v4.17.1
- 開發套件: [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - v5.3.0
- 開發套件: [Nodemon](https://www.npmjs.com/package/nodemon) - v2.0.7
- 開發套件: [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers) - v0.10.0
- 開發套件: [method-override](https://www.npmjs.com/package/method-override) - v3.0.0
- 開發套件: [moment](https://www.npmjs.com/package/moment) -v2.29.1
- 開發資料庫: [MongoDB](https://www.mongodb.com/) - v4.2.13
- 開發資料庫套件: [Mongoose](https://www.npmjs.com/package/mongoose) - (MongoDB 的 ODM) v5.12.6


## 安裝與執行步驟 - Installation & Execution
1. 打開你的終端機(Terminal)，git clone 此專案至本機電腦，或直接從 github 下載並解壓縮此專案

```
git clone https://github.com/MOMOJMOGG/ShortUrl.git
```

2. 在終端機下指令，進入存放此專案的資料夾，Ex: 放置此專案位置 D://ShortUrl

```
cd D://ShortUrl
```

3. 在終端機下指令，安裝此專案需要的 npm 套件

```
npm install
```

4. 在終端機下指令，匯入餐廳資料種子檔案

```
npm run seed
```

5. 當終端機出現以下字樣，表示種子檔案已成功匯入 MongoDB 中

```
MongoDB connected!
Connected to MongoDB -- Record!
ShortUrl Seeder Creating Finished!
MongoDB Connected Closed!
```

6. 運行 start 腳本指令，啟動專案伺服器

```
npm run start
```

7. 當終端機出現以下字樣，表示伺服器已啟動成功

```
App is running on http://localhost:3000.
mongodb connected!
```

8. 在終端機下指令 Ctrl+C 兩次，關閉伺服器

9. (Option) 若想在此專案使用開發者模式，在終端機下指令，安裝 nodemon 套件，幫助自動重啟伺服器。在第四步驟，改運行 dev 腳本指令，啟動專案伺服器

```
npm install -g nodemon

npm run dev
```


## 專案開發人員 - Contributor

> [MOMOJ](https://github.com/MOMOJMOGG)

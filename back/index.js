require('dotenv').config()
const express = require('express')
const cors = require('cors')

const router = require('./app/router')

const app = express()
const port = process.env.PORT || 5500

// TODO: DO NOT FORGET TO SET BACK TO RESTRICTED CORS POLICIES
// const corsOption = { origin: process.env.ORIGIN_FRONT || "http://localhost:3000" }; // autorise seulement le domaine indiqué dans la variable ORIGIN_FRONT
// app.use(cors(corsOption));// A placer le plus tôt possible et surtout toujours avant app.use('/v1', router);
app.use(cors()) // Temporary CORS setup

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/v1', router)

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})

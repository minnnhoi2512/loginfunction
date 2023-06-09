import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connnect from './database/database.js'
import { usersRouter } from './router/index.js'

dotenv.config()// must have

//authentication middleware

//
const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', usersRouter)
const port = process.env.PORT || 3000
//
app.get('/', (req, res) => {
    res.send('response from  router')
})
app.listen(port, async (req, res) => {
    connnect()
    console.log(`Listening on port : ${port}`)
})
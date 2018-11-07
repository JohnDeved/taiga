import * as express from 'express'
import { models } from '../db/shema'

import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello world')
})

export = router

import * as express from 'express'
import { models } from '../db/shema'

import * as dotenv from 'dotenv'
dotenv.config()

import { google } from 'googleapis'
import { rarbg } from 'rarbg-api-ts'
import { tvmaze } from 'tvmaze-api-ts'

const router = express.Router()

// tslint:disable:variable-name
const getDrive = access_token => {
  return google.drive({
    version: 'v3',
    params: { access_token }
  })
}

router.post('/rarbg/list', async (req, res) => {
  const options = req.body
  rarbg.list(options).then(result => {
    res.json(result)
  })
})

router.post('/rarbg/imdb/:id', async (req, res) => {
  const { id } = req.params
  const options = req.body
  rarbg.searchImdb(id, options).then((result: any) => {
    result = result.map(torrent => {
      console.log(torrent)
      torrent.hash = torrent.download.match(/urn:btih:([\w\d]+)/)[1]
      return torrent
    })

    res.json(result)

    // catalog torrents
    result.forEach(async t => {
      models.Torrent.findOne({ hash: t.hash }).then(torrent => {
        if (torrent) {
          torrent.update(t)
        } else {
          torrent = new models.Torrent(t)

          torrent.save()
        }
      })
    })
  })
})

router.get('/teamdrives', (req, res) => {
  const drive = getDrive(req.user.accessToken)

  drive.teamdrives.list((err, response) => {
    if (err) return res.send(err)
    res.json(response.data)
  })
})

export = router

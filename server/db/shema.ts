import { connect, Schema, model } from 'mongoose'

connect('mongodb://localhost:32768/evvt')

const Auth = new Schema({
  name: String,
  token: String
})

const User = new Schema({
  id: String,
  displayName: String,
  accessToken: String,
  refreshToken: String,
  _json: Object
})

const Torrent = new Schema({
  category: String,
  download: String,
  episode_info: {
    imdb: String,
    themoviedb: String,
    tvdb: String
  },
  info_page: String,
  pubdate: String,
  title: String,
  seeders: Number,
  leechers: Number,
  hash: String
})

export class Models {
  public Auth = model('auth', Auth, 'auths')
  public User = model('user', User, 'users')
  public Torrent = model('torrent', Torrent, 'torrents')
}

export const models = new Models()

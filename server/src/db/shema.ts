import { connect, Schema, model } from 'mongoose'

connect('mongodb://localhost:32768/taiga')

const User = new Schema({
  id: String,
  displayName: String
})

export class Models {
  public User = model('user', User, 'users')
}

export const models = new Models()

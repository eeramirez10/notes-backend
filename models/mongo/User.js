import { model } from 'mongoose'
import { userSchema } from '../../schemas/schemas.js'

/* eslint-disable space-unary-ops */
export const User = model('User', userSchema)

export class UserModel {
  static getAll = async () => {
    const users = await User.find({}).populate('notes', {
      user: 0
    })
    return users
  }

  static deleteAll = async () => {
    await User.deleteMany({})
  }

  static create = async ({ input }) => {
    const { username, name, passwordHash } = input
    const user = new User({ username, name, passwordHash })
    const newUser = await user.save()

    return newUser
  }

  static findById = async ({ id }) => {
    console.log(id)
    const user = await User.findById(id)
    console.log(user)
    return user
  }

  static findOne = async (field) => {
    const user = await User.findOne(field)
    return user
  }
}

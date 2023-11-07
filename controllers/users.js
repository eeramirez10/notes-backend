import { UserModel } from '../models/mongo/User.js'
import bcrypt from 'bcrypt'

export class UserController {
  static getAll = async (req, res) => {
    const users = await UserModel.getAll()
    return res.json(users)
  }

  static create = async (req, res) => {
    const { body } = req
    const {
      username,
      name,
      password
    } = body

    try {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const input = {
        username,
        name,
        passwordHash
      }

      const user = await UserModel.create({ input })

      return res.status(201).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

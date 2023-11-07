import { UserModel } from '../models/mongo/User.js'

export const getUsers = async () => {
  const usersDB = await UserModel.getAll()
  return usersDB.map(user => user.toJSON())
}

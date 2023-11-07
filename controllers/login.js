import bcrypt from 'bcrypt'
import { UserModel } from '../models/mongo/User.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await UserModel.findOne({ username })

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'username or password invalid'
      })
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
      return res.status(401).json({
        ok: false,
        msg: 'username or password invalid'
      })
    }

    const userForToken = {
      id: user.id,
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

    return res.json({
      user: user.name,
      username: user.username,
      token
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

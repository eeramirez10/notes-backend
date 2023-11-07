import { Router } from 'express'
import { login } from '../controllers/login.js'
export const loginRouter = Router()

loginRouter.post('/', login)

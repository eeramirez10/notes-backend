import express, { json } from 'express'
import cors from 'cors'
import connectDB from './mongo.js'
import { createNotesRouter } from './routes/notes.js'
import { notFound } from './middelewares/notFoud.js'
import { handleErrors } from './middelewares/handleErrors.js'
import { usersRouter } from './routes/users.js'
import { loginRouter } from './routes/login.js'

export const createApp = ({ noteModel }) => {
  const app = express()
  connectDB()

  app.use(cors())
  app.use(json())

  app.use('/api/notes', createNotesRouter({ noteModel }))
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)
  app.use(notFound)
  app.use(handleErrors)

  const PORT = process.env.PORT || 3000
  const server = app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`)
  })

  return { app, server }
}

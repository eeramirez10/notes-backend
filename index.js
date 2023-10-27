import express, { json } from 'express'
import cors from 'cors'
import connectDB from './mongo.js'
import { notesRouter } from './routes/notes.js'
const app = express()

connectDB()

app.use(cors())
app.use(json())

app.use('/api/notes', notesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

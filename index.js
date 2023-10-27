/* eslint-disable space-unary-ops */
/* eslint-disable object-shorthand */
import express, { json } from 'express'
import cors from 'cors'
import connectDB from './mongo.js'
import { Note } from './models/Note.js'
const app = express()

connectDB()

app.use(cors())
app.use(json())

let notes = []

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})
  return res.json(notes)
})

app.get('/api/notes/:id', async (req, res) => {
  const id = req.params.id

  try {
    const note = await Note.findById(id)

    if (note) {
      return res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error)
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', async (req, res) => {
  const { content, important } = req.body

  if (!content) {
    return res.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const note = new Note({
    content: content,
    date: new Date().toLocaleString(),
    important: important || false
  })

  const newNote = await note.save()

  res.json(newNote)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

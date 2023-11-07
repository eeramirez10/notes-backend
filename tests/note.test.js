/* eslint-disable space-unary-ops */
import supertest from 'supertest'
import { appMongo } from '../server-with-mongo.js'
import mongoose from 'mongoose'
import { Note, NoteModel } from '../models/mongo/Note.js'

const { app, server } = appMongo

const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo fullstack JS con midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'Sigueme en https://midu.tube',
    important: true,
    date: new Date()
  },
  {
    content: 'Aprendiedo JS Vainilla',
    important: true,
    date: new Date()
  },
  {
    content: 'Aprendiedo Python',
    important: true,
    date: new Date()
  }
]

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    await NoteModel.create({ input: note })
  }
})

describe.skip('Get and create notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
  })

  test('there are two notes', async () => {
    const notes = await api.get('/api/notes')

    expect(notes.body).toHaveLength(initialNotes.length)
  })

  test('the first note must be midudev', async () => {
    const notes = await api.get('/api/notes')

    const contents = notes.body.map(note => note.content)

    expect(contents).toContain('Aprendiendo fullstack JS con midudev')
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})

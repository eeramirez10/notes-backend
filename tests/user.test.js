import { UserModel } from '../models/mongo/User'
import bcrypt from 'bcrypt'
import supertest from 'supertest'
import { createApp } from '..'
import { NoteModel } from '../models/mongo/Note'
import mongoose from 'mongoose'
import { getUsers } from '../helpers/helpers'

const { app, server } = createApp({ noteModel: NoteModel })

const api = supertest(app)

describe('creating a new user', () => {
  beforeEach(async () => {
    await UserModel.deleteAll()
    const passwordHash = await bcrypt.hash('1234', 10)
    const newUser = {
      username: 'eeramirez',
      passwordHash
    }

    await UserModel.create({ input: newUser })
  })

  test.skip('works as espected creating a fresh username', async () => {
    const usersAtStart = await getUsers()
    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'twich'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'eeramirez',
      name: 'Miguel',
      password: 'midutest'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
      .expect('Content-Type', /application\/json/)

    expect(result.body.message).toContain('`username` to be unique')

    const usersAtEnd = await getUsers()

    expect(usersAtStart.length).toBe(usersAtEnd.length)
  })

  afterAll(async () => {
    server.close()
    mongoose.connection.close()
  })
})

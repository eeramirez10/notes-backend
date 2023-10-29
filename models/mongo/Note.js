/* eslint-disable space-unary-ops */
import { noteSchema } from '../../schemas/schemas.js'
import { model } from 'mongoose'

export const Note = model('Note', noteSchema)

export class NoteModel {
  static async getAll () {
    return await Note.find({})
  }

  static async getById ({ id }) {
    return Note.findById(id)
  }

  static async delete ({ id }) {
    return Note.findByIdAndDelete(id)
  }

  static async create ({ input }) {
    const newNote = new Note({
      content: input.content,
      date: new Date(),
      important: input.important || false
    })
    const note = await newNote.save()
    return note
  }

  static async update ({ id, input }) {
    const newNote = await Note.findByIdAndUpdate(id, input, { new: true })
    return newNote
  }
}

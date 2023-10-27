/* eslint-disable space-unary-ops */
import { Note } from '../models/Note.js'

export class NoteController {
  static async getAll (req, res) {
    const notes = await Note.find({})
    return res.json(notes)
  }

  static async getById (req, res) {
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
  }

  static async delete (req, res) {
    const { id } = req.params
    const note = await Note.findByIdAndDelete(id)

    console.log(note)

    return res.json({
      msg: 'Nota Eliminada correctamente'
    })
  }

  static async create (req, res) {
    const { content, important } = req.body

    if (!content) {
      return res.status(400).json({
        error: 'required "content" field is missing'
      })
    }

    const note = new Note({
      content,
      date: new Date(),
      important: important || false
    })

    try {
      const newNote = await note.save()
      res.json(newNote)
    } catch (error) {
      console.log(error)
    }
  }
}

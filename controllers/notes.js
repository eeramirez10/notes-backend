/* eslint-disable lines-between-class-members */
/* eslint-disable space-unary-ops */

export class NoteController {
  constructor ({ noteModel }) {
    this.noteModel = noteModel
  }
  getAll = async (req, res, next) => {
    try {
      const notes = await this.noteModel.getAll()
      return res.json(notes)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    const id = req.params.id
    try {
      const note = await this.noteModel.getById({ id })

      if (note) {
        return res.json(note)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params
    try {
      const note = await this.noteModel.delete({ id })
      return res.json({
        msg: 'Nota Eliminada correctamente',
        note
      })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    const { content } = req.body
    if (!content) {
      return res.status(400).json({
        error: 'required "content" field is missing'
      })
    }
    try {
      const newNote = await this.noteModel.create({ input: req.body })
      res.json(newNote)
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    if (!body.content) {
      return res.status(400).json({ msg: 'required "content" field is missing' })
    }
    try {
      const note = await this.noteModel.update({ id, input: body })
      return res.status(202).json({ msg: 'Actualizado correctamente', note })
    } catch (error) {
      next(error)
    }
  }
}

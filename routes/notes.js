/* eslint-disable space-unary-ops */
import { Router } from 'express'
import { NoteController } from '../controllers/notes.js'

export const createNotesRouter = ({ noteModel }) => {
  const noteController = new NoteController({ noteModel })
  const notesRouter = Router()

  notesRouter.get('/', noteController.getAll)

  notesRouter.get('/:id', noteController.getById)

  notesRouter.delete('/:id', noteController.delete)

  notesRouter.post('/', noteController.create)

  notesRouter.patch('/:id', noteController.update)

  return notesRouter
}

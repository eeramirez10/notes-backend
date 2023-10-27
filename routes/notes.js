/* eslint-disable space-unary-ops */
import { Router } from 'express'
import { NoteController } from '../controllers/notes.js'

export const notesRouter = Router()

notesRouter.get('/', NoteController.getAll)

notesRouter.get('/:id', NoteController.getById)

notesRouter.delete('/:id', NoteController.delete)

notesRouter.post('/', NoteController.create)

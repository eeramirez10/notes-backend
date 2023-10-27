import { noteSchema } from '../schemas/schemas.js'
import { model } from 'mongoose'

export const Note = model('Note', noteSchema)

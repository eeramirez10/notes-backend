import { createApp } from './index.js'
import { NoteModel } from './models/mongo/Note.js'

export const appMongo = createApp({ noteModel: NoteModel })

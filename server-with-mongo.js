import { createApp } from './index.js'
import { NoteModel } from './models/mongo/Note.js'

createApp({ noteModel: NoteModel })

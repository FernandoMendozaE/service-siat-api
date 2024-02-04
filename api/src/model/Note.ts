import { Document, Schema, model } from 'mongoose'

interface NoteAttributes {
  title: string
  description?: string
}

export interface NoteDocument extends Document, NoteAttributes {}

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

const Note = model<NoteDocument>('Note', noteSchema)

export default Note

import { Server } from 'socket.io'
import Note, { NoteDocument } from './model/Note'

export default (io: Server): void => {
  io.on('connection', socket => {
    const emitNotes = async (): Promise<void> => {
      try {
        const notes: NoteDocument[] = await Note.find()
        io.emit('server:loadnotes', notes)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    emitNotes()

    socket.on('client:newnote', async (data): Promise<void> => {
      try {
        const newNote = new Note(data)
        const savedNote: NoteDocument = await newNote.save()
        io.emit('server:newnote', savedNote)
      } catch (error) {
        console.error('Error saving new note:', error)
      }
    })

    socket.on('client:deletenote', async (id): Promise<void> => {
      try {
        await Note.findByIdAndDelete(id)
        emitNotes()
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    })

    socket.on('client:getnote', async (id): Promise<void> => {
      try {
        const note: NoteDocument | null = await Note.findById(id)

        if (note) {
          io.emit('server:selectednote', note)
        }
      } catch (error) {
        console.error('Error getting note:', error)
      }
    })

    socket.on('client:updatenote', async (updatedNote): Promise<void> => {
      try {
        await Note.findByIdAndUpdate(updatedNote._id, {
          title: updatedNote.title,
          description: updatedNote.description
        })
        emitNotes()
      } catch (error) {
        console.error('Error updating note:', error)
      }
    })
  })
}

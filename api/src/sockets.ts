import { Server } from 'socket.io'
import Note, { NoteDocument } from './model/Note'
import winston from 'winston'
import 'colors' // Importa la biblioteca 'colors'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => {
      const { timestamp, level, message } = info
      const logMessage = `[${timestamp}] [${level}] ${message}`
      return level === 'error' ? logMessage.red : logMessage // Utiliza 'red' de 'colors' aquí
    })
  ),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'error.log' })]
})

export default (io: Server): void => {
  io.on('connection', socket => {
    const emitNotes = async (): Promise<void> => {
      try {
        const notes: NoteDocument[] = await Note.find()
        io.emit('server:loadnotes', notes)
      } catch (error: any) {
        logger.error(`Error fetching notes: ${(error as Error).message}`)
      }
    }
    emitNotes()

    socket.on('client:newnote', async (data): Promise<void> => {
      try {
        const newNote = new Note(data)
        const savedNote: NoteDocument = await newNote.save()
        io.emit('server:newnote', savedNote)
      } catch (error: any) {
        logger.error(`Error saving new note: ${(error as Error).message}`)
      }
    })

    socket.on('client:deletenote', async (id): Promise<void> => {
      try {
        await Note.findByIdAndDelete(id)
        emitNotes()
      } catch (error: any) {
        logger.error(`Error deleting note: ${(error as Error).message}`)
      }
    })

    socket.on('client:getnote', async (id): Promise<void> => {
      try {
        const note: NoteDocument | null = await Note.findById(id)

        if (note) {
          io.emit('server:selectednote', note)
        }
      } catch (error: any) {
        logger.error(`Error getting note: ${(error as Error).message}`)
      }
    })

    socket.on('client:updatenote', async (updatedNote): Promise<void> => {
      try {
        await Note.findByIdAndUpdate(updatedNote._id, {
          title: updatedNote.title,
          description: updatedNote.description
        })
        emitNotes()
      } catch (error: any) {
        logger.error(`Error updating note: ${(error as Error).message}`)
      }
    })
  })
}

import { connect } from 'mongoose'
import { MONGODB_URI } from './util/config'

// * Conección a la base de datos
;(async () => {
  try {
    const db = await connect(`mongodb://${MONGODB_URI}/siatdb`)
    console.log('Database is connected to', db.connection.name)
  } catch (error) {
    console.error(error)
  }
})()

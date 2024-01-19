import app from './app'
import './db'
import './util/initialSetup'
import { PORT } from './util/config'

app.listen(PORT)
console.log('Server is running on port', PORT)

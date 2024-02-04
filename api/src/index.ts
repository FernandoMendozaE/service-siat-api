import app from './app'
import './db'
import './util/initialSetup'
import { PORT } from './util/config'
import { Server as WebsocketServe } from 'socket.io'
import http from 'http'
import sockets from './sockets'

const server = http.createServer(app)
const httpServer = server.listen(PORT)
console.log(`Server is running on port ${PORT}`)

const io = new WebsocketServe(httpServer)
sockets(io)

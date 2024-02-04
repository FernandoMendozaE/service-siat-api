import express from 'express'
import { PORT } from './util/config'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './util/swaggerOptions'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// * Middlewares
app.set('port', PORT)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ? swagger
const specs = swaggerJsDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

// * Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)

export default app

import { config } from 'dotenv'

config()

// * Declaración de variables de entorno
export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI || 'localhost'
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const CLOUD_NAME = process.env.CLOUD_NAME || 'cloud_name'
export const API_KEY = process.env.API_KEY || 'api_key'
export const API_SECRET = process.env.API_SECRET || 'api_secret'

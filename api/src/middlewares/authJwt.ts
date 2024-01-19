/**
 * ? Archivo encargado de verificar el token
 */
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/config'
import { NextFunction, Request, Response } from 'express'
interface JwtPayload {
  userId: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-access-token')

    if (!token) return res.status(403).json({ message: 'No token provided' }) // ? validar cabecera del token

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorrize' }) // ? token no autorizado
  }
}

import { NextFunction, Request, Response } from 'express'
import User from '../model/User'
import Role from '../model/Role'
import { SingUpBodySchema } from '../schemas/auth.schema'

// * Verifica si existe usuario duplicado
export const checkDuplicateEmail = async (
  req: Request<unknown, unknown, SingUpBodySchema, unknown>,
  res: Response,
  next: NextFunction
) => {
  const findUser = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
  if (findUser)
    return res
      .status(400)
      .json({ message: 'The email or username already exists' })

  next()
}

// * Verifica rol del usuario
export const isRole =
  (tipoRol: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user?.roles } })

    const roleFound = roles.find(
      role => role.name === tipoRol || role.name === 'admin'
    )
    if (roleFound) return next()

    return res
      .status(401)
      .json({
        message: `Require ${tipoRol} ${
          tipoRol === 'admin' ? 'role' : 'or admin role'
        } `
      })
  }

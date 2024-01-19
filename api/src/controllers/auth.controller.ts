import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/config'
import RolModel from '../model/Role'
import UserModel from '../model/User'
import { SingUpBodySchema, SingInBodySchema } from '../schemas/auth.schema'

// * Registro de usuario
export const signUp = async (
  req: Request<unknown, unknown, SingUpBodySchema, unknown>,
  res: Response
) => {
  try {
    const { username, firstname, lastname, email, password, roles } = req.body
    const newUser = new UserModel({
      username,
      firstname,
      lastname,
      email,
      password
    })
    const foundRoles = await RolModel.find({ name: { $in: roles } }) // ? find encuentra uno o mas roles, $in es un array de roles que estan dentro de roles
    newUser.roles = foundRoles.map(role => role._id)
    await newUser.save()

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '20d'
    })
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

// * Login de usuario
export const signIn = async (
  req: Request<unknown, unknown, SingInBodySchema, unknown>,
  res: Response
) => {
  try {
    const userFound = await UserModel.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    }).populate('roles') // ? populate es para traer los roles de un usuario en especifico y no solo el id de ese rol
    if (!userFound) return res.status(401).json({ message: 'User not found' })

    const matchPassword = await userFound.comparePassword(req.body.password)
    if (!matchPassword) return res.status(401).json({ message: 'Password incorrect' })

    const token = jwt.sign({ userId: userFound._id }, JWT_SECRET, {
      expiresIn: '20d'
    })

    return res.status(200).json({ token })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

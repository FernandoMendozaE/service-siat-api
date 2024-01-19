import { Request, Response } from 'express'
import RoleModel from '../model/Role'
import UserModel from '../model/User'
import {
  GetOrDeleteUserParamsType,
  UpdateUserBodyType,
  UpdateUserParamsType
} from '../schemas/user.Schema'
import os from 'os'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find()
      .populate('roles', 'name -_id')
      .sort({ createdAt: -1 })
    return res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getUser = async (
  req: Request<GetOrDeleteUserParamsType, unknown, unknown, unknown>,
  res: Response
) => {
  try {
    const { id } = req.params
    const user = await UserModel.findById(id).populate('roles', 'name -_id')
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const updateUser = async (
  req: Request<UpdateUserParamsType, unknown, UpdateUserBodyType, unknown>,
  res: Response
) => {
  try {
    const { roles } = req.body
    const foundRoles = await RoleModel.find({ name: { $in: roles } })
    const rolesId = foundRoles.map(role => role._id)
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, roles: rolesId },
      { new: true }
    ).populate('roles', 'name -_id')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteUser = async (
  req: Request<UpdateUserParamsType, unknown, unknown, unknown>,
  res: Response
) => {
  try {
    const { id } = req.params
    const result = await UserModel.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const ping = async (req: Request, res: Response) => {
  try {
    if (os.hostname()) {
      setTimeout(() => {
        const hostname = os.hostname()
        console.log('Hostname for the container system is ' + String(hostname))
        return res.status(200).json({
          message: `Pong! Hostname for the container system is ${String(
            hostname
          )}`
        })
      }, 3000)
    } else {
      return res.status(200).json({
        message: 'Not hostname for the container'
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

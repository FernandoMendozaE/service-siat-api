import { Router } from 'express'
// * Importación de controladores
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  ping
} from '../controllers/user.controller'
import { verifyToken } from '../middlewares/authJwt'

// * Importación de middlewares
import { schemaValition } from '../middlewares/schemaValidator.middleware'
import { isRole } from '../middlewares/verifySignup'

// * Importación de esquemas
import { GetOrDeleteUserSchema, UpdateUserSchema } from '../schemas/user.Schema'

const router = Router()

router.get('/users', [verifyToken, isRole('admin')], getUsers)

router.get(
  '/users/:id',
  schemaValition(GetOrDeleteUserSchema),
  [verifyToken, isRole('admin')],
  getUser
)

router.put(
  '/users/:id',
  schemaValition(UpdateUserSchema),
  [verifyToken, isRole('admin')],
  updateUser
)

router.delete(
  '/users/:id',
  schemaValition(UpdateUserSchema),
  [verifyToken, isRole('admin')],
  deleteUser
)

router.get('/ping', ping)

export default router

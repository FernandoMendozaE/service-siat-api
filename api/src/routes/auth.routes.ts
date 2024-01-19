import { Router } from 'express'
// * Importación de controladores
import { signUp, signIn } from '../controllers/auth.controller'

// * Importación de middlewares
import { schemaValition } from '../middlewares/schemaValidator.middleware'
import { checkDuplicateEmail } from '../middlewares/verifySignup'

// * Importación de esquemas
import { AuthSingUpSchema, AuthSingInSchema } from '../schemas/auth.schema'

const router = Router()

router.post('/signup', schemaValition(AuthSingUpSchema), [checkDuplicateEmail], signUp)
router.post('/signin', schemaValition(AuthSingInSchema), signIn)

export default router

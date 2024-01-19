import {
  DocumentType,
  getModelForClass,
  index,
  ModelOptions,
  pre,
  prop,
  Ref
} from '@typegoose/typegoose'
import { Role } from './Role'
import bycrypt from 'bcryptjs'

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false
  }
})
@index({ email: 1 }, { unique: true })
// * Encripcion de contraseña
@pre<User>('save', async function () {
  this.password = await bycrypt.hash(this.password, 10)
})
export class User {
  @prop({ required: true, trim: true })
  public username: string

  @prop({ required: true, trim: true })
  public firstname: string

  @prop({ required: true, trim: true })
  public lastname: string

  @prop({ required: true })
  public email!: string

  @prop({ required: true, trim: true, minlength: 6 })
  public password: string

  @prop({ ref: () => Role })
  roles: Ref<Role>[]

  async comparePassword(this: DocumentType<User>, password: string): Promise<boolean> {
    return await bycrypt.compare(password, this.password)
  }
}

const UserModel = getModelForClass(User)
export default UserModel

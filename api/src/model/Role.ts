import { getModelForClass, modelOptions, Prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false
  }
})
export class Role {
  @Prop({ required: true, trim: true })
  public name: string
}

const RoleModel = getModelForClass(Role)
export default RoleModel

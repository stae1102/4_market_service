import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import UserRole from './enums/user-role.enum';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Users extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'NORMAL' })
  role: UserRole[];

  @Prop()
  deletedAt: null | Date;

  readonly protectedData: {
    email: string;
    role: string;
  };
}
export const UsersSchema = SchemaFactory.createForClass(Users);
UsersSchema.virtual('protectedData').get(function (this: Users) {
  return {
    email: this.email,
    role: this.role,
  };
});

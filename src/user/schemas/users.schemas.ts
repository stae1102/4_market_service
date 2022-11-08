import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'normal' })
  userType: 'normal' | 'seller' | 'admin';

  @Prop()
  deletedAt: null | Date;

  readonly protectedData: {
    email: string;
    name: string;
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('protectedData').get(function (this: User) {
  return {
    email: this.email,
    userType: this.userType,
  };
});

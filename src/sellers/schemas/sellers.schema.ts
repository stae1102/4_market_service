import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Sellers extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  deletedAt: null | Date;

  @Prop({ type: Types.ObjectId, ref: 'Users._id' })
  OwnerId: Types.ObjectId;
}

export const SellersSchema = SchemaFactory.createForClass(Sellers);

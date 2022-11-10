import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Products extends Document {
  @Prop({ required: true, index: 'text' })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  nation!: string;

  @Prop({ default: () => new Date().setDate(new Date().getDate() + 7) })
  orderDeadline?: Date;

  @Prop()
  deletedAt: null | Date;

  @Prop({ type: Types.ObjectId, ref: 'Seller._id' })
  SellerId: Types.ObjectId;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

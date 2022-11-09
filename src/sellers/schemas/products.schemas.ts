import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Products extends Document {
  @Prop({ required: true })
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
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

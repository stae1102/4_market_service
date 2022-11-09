export class RegisterProductDto {
  name!: string;
  description!: string;
  price!: number;
  category!: string;
  nation!: string;
  orederDeadline?: Date;
}

export class CreateUserDto {
  email: string;
  password: string;
  role?: 'normal' | 'seller' | 'admin';
}

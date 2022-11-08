export class CreateUserDto {
  email: string;
  password: string;
  userType?: 'normal' | 'seller' | 'admin';
}

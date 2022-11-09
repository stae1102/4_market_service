import UserRole from '../schemas/enums/user-role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  role?: UserRole;
}

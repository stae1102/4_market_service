const UserRole = {
  NORMAL: 'NORMAL',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];

export = UserRole;

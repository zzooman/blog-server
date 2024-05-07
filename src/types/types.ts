import { $Enums } from '@prisma/client';

export interface CreateUserDto {
  username: string;
  password: string;
  division: $Enums.Division;
}
export interface LoginUserDto {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  division: $Enums.Division;
}

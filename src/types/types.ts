import { $Enums } from '@prisma/client';

export interface CreateUserPayload {
  userId: string;
  password: string;
  division: $Enums.Division;
}
export interface LoginUserParams {
  userId: string;
  password: string;
}

export interface User {
  id: number;
  userId: string;
  password: string;
  division: $Enums.Division;
}

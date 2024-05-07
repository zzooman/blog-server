import { $Enums } from '@prisma/client';

export interface CreateUserPayload {
  userId: string;
  password: string;
  division: $Enums.Division;
}

export interface User {
  id: number;
  userId: string;
  division: $Enums.Division;
}

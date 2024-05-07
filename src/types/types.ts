import { $Enums } from '@prisma/client';

export interface CreateUserPayload {
  email: string;
  division: $Enums.Division;
}

export interface User {
  id: number;
  email: string;
  division: $Enums.Division;
}

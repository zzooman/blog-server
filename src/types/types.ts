import { Prisma } from '@prisma/client';

export interface CreateUserPayload {
  email: string;
  division: Division;
}
export enum Division {
  frontend = 'frontend',
  backend = 'backend',
}
export interface User {
  id: number;
  email: string;
  division: Prisma;
}

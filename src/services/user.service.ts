import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserPayload, Division, User } from 'src/types/types';

@Injectable()
export class UserService {
  async createUser({ email, division }: CreateUserPayload): Promise<User> {
    const prisma = new PrismaClient();
    const createdUser: User = await prisma.user.create({
      data: {
        email,
        division,
      },
    });
    return createdUser;
  }
}

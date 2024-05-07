import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserPayload, User } from 'src/types/types';

@Injectable()
export class UserService {
  async createUser({ email, division }: CreateUserPayload): Promise<User> {
    const prisma = new PrismaClient();
    const createdUser = await prisma.user.create({
      data: {
        email,
        division,
      },
    });
    return createdUser;
  }
}

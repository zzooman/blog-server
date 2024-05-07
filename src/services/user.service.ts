import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';
import { CreateUserPayload, User } from 'src/types/types';

@Injectable()
export class UserService {
  async createUser({
    userId,
    password,
    division,
  }: CreateUserPayload): Promise<User> {
    try {
      const response = await fetch(
        `${env.AUTH_API_URL}/v1/login?id=${userId}&password=${password}`,
      );
      const data = await response.json();
      console.log('data', data);
      const prisma = new PrismaClient();
      const createdUser = await prisma.user.create({
        data: {
          userId,
          division,
        },
      });
      return createdUser;
    } catch (e) {
      console.log(e);
    }
  }
}

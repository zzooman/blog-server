import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MemberLoginResponse } from 'src/types/dto';
import { CreateUserPayload, LoginUserParams, User } from 'src/types/types';

@Injectable()
export class UserService {
  async createUser({
    userId,
    password,
    division,
  }: CreateUserPayload): Promise<User> {
    try {
      const response = await fetch(
        `${process.env.AUTH_API_URL}/v1/login/${userId}?password=${password}`,
      );
      const data: MemberLoginResponse = await response.json();
      const prisma = new PrismaClient();
      const existUser = await prisma.user.findFirst({
        where: {
          userId: userId,
        },
      });
      if (existUser) return existUser;
      if (data.name) {
        const createdUser = await prisma.user.create({
          data: {
            userId,
            division,
            password,
          },
        });
        return createdUser;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async login({ userId, password }: LoginUserParams): Promise<User> {
    const prisma = new PrismaClient();
    const user = prisma.user.findFirst({
      where: {
        userId: userId,
        password: password,
      },
    });
    return user;
  }
}

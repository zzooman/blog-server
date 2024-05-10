import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/types/dto';
import { User } from 'src/types/types';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  async create({ username, password, division }: CreateUserDto): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user) {
      throw new ForbiddenException('이미 존재하는 유저입니다.');
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        division,
      },
    });
    return newUser;
  }

  async update(
    username: string,
    { username: newUsername, password, division }: CreateUserDto,
  ): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: { username },
      data: {
        username: newUsername,
        password,
        division,
      },
    });
    return user;
  }

  async deleteUser(username: string): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.delete({
      where: { username },
    });
    return user;
  }
}

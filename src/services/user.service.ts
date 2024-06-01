import { ForbiddenException, Injectable } from '@nestjs/common';
import { Article, PrismaClient } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from 'src/types/dto';
import { IResponse, User } from 'src/types/types';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  async create({ email, password, division }: CreateUserDto): Promise<IResponse<User>> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      throw new ForbiddenException('이미 존재하는 유저입니다.');
    }
    const username = email.split('@mustit')[0];
    if (!username) {
      throw new ForbiddenException('올바른 이메일 형식이 아닙니다. @mustit.co.kr로 끝나는 이메일을 입력해주세요.');
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
        division,
      },
    });
    return {
      status: 200,
      message: '유저 생성 성공',
      data: newUser,
    };
  }

  async update(username: string, { username: newUsername, password, division }: UpdateUserDto): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: { username },
      data: {
        username: newUsername,
        email: newUsername + '@mustit.co.kr',
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

  async mydata(user: any): Promise<{ user: User; articles: Article[] }> {
    const prisma = new PrismaClient();
    const me = await prisma.user.findUnique({
      where: { id: user.id },
    });
    const articles = await prisma.article.findMany({
      where: { authorId: user.id },
    });
    return { user: me, articles };
  }
}

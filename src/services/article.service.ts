import { BadRequestException, Injectable } from '@nestjs/common';
import { Post as IPost, PrismaClient } from '@prisma/client';

@Injectable()
export class ArticleService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createArticle(payload: Partial<IPost>, user: any): Promise<IPost> {
    if (!payload.title) {
      throw new BadRequestException('제목을 입력해주세요');
    }
    if (!payload.content) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    const newPost = await this.prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        authorId: user.id,
      },
    });
    return newPost;
  }

  async getArticle(id: number): Promise<IPost> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  }

  async updateArticle(id: number, payload: Partial<IPost>): Promise<IPost> {
    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
    return updatedPost;
  }

  async deleteArticle(id: number): Promise<IPost> {
    const deletedPost = await this.prisma.post.delete({
      where: {
        id,
      },
    });
    return deletedPost;
  }
}

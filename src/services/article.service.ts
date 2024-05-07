import { Injectable } from '@nestjs/common';
import { Post as IPost, PrismaClient } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma = new PrismaClient()) {}

  async createArticle(payload: Partial<IPost>): Promise<IPost> {
    const newPost = await this.prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        authorId: payload.authorId,
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

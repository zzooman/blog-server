import { BadRequestException, Injectable } from '@nestjs/common';
import { Post as IPost, PrismaClient } from '@prisma/client';
import { IResponse } from 'src/types/types';

@Injectable()
export class ArticleService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createArticle(
    payload: Partial<IPost>,
    user: any,
  ): Promise<IResponse<IPost>> {
    if (!payload.title) {
      throw new BadRequestException('제목을 입력해주세요');
    }
    if (!payload.content) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    if (!payload.lowContent) {
      throw new BadRequestException('lowContent 값을 보내주세요');
    }
    if (!user) {
      throw new BadRequestException('로그인이 필요합니다');
    }
    const newPost = await this.prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        lowContent: payload.lowContent,
        authorId: user.id,
      },
    });
    return {
      status: 200,
      message: '게시글 생성 성공',
      data: newPost,
    };
  }

  async getArticle(id: number): Promise<IPost> {
    const post = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return post;
  }

  async getAllArticles(): Promise<IPost[]> {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async updateArticle(
    id: number,
    payload: Partial<IPost>,
    user: any,
  ): Promise<IPost> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (post.authorId !== user.id) {
      throw new BadRequestException('작성자만 수정할 수 있습니다');
    }
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

  async deleteArticle(id: number, user: any): Promise<IPost> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (post.authorId !== user.id) {
      throw new BadRequestException('작성자만 삭제할 수 있습니다');
    }
    const deletedPost = await this.prisma.post.delete({
      where: {
        id,
      },
    });
    return deletedPost;
  }
}

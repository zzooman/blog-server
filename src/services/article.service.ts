import { BadRequestException, Injectable } from '@nestjs/common';
import { Comment, Article, PrismaClient, User } from '@prisma/client';
import { IResponse, ArticleDetail, ArticlesResponse, ArticleWithAuthor } from 'src/types/types';

@Injectable()
export class ArticleService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createArticle(payload: Partial<Article>, user: any): Promise<IResponse<Article>> {
    if (!payload.title) {
      throw new BadRequestException('제목을 입력해주세요');
    }
    if (!payload.content) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    if (!payload.rawContent) {
      throw new BadRequestException('rawContent 값을 보내주세요');
    }
    const author = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (author?.id !== user?.id) {
      throw new BadRequestException('로그인이 필요합니다');
    }
    const newArticle = await this.prisma.article.create({
      data: {
        title: payload.title,
        content: payload.content,
        rawContent: payload.rawContent,
        authorId: user.id,
        ...(payload.thumbnail && { thumbnail: payload.thumbnail }),
        ...(payload.published && { published: payload.published }),
      },
    });
    return {
      status: 200,
      message: '게시글 생성 성공',
      data: newArticle,
    };
  }

  async getArticle(id: number, user: any): Promise<ArticleDetail> {
    const articleExists = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (!articleExists) {
      throw new BadRequestException('게시글이 존재하지 않습니다');
    }
    const article = await this.prisma.article.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    const isLiked = await this.prisma.likes.findFirst({
      where: {
        articleId: id,
        userId: user?.id,
      },
    });
    const comments = await this.prisma.comment.findMany({
      where: {
        articleId: id,
      },
    });

    return {
      ...article,
      comments,
      isLiked: !!isLiked,
    };
  }

  async getAllArticles(page: number, offset: number, keyword?: string): Promise<ArticlesResponse> {
    const skip = (page - 1) * offset;
    const where = keyword
      ? {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              content: {
                contains: keyword,
              },
            },
          ],
        }
      : {};
    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        take: offset,
      }),
      this.prisma.article.count({ where }),
    ]);
    const totalPage = Math.ceil(total / offset);
    const articleForList = articles.map(async article => {
      const author: Omit<User, 'password'> = await this.prisma.user.findUnique({
        where: {
          id: article.authorId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          division: true,
        },
      });

      const {content, ...articleWithoutBody} = article;
      return {
        author,
        preview : article.content.slice(0, 200),
        ...articleWithoutBody,
      };
    });

    return {
      articles: await Promise.all(articleForList),
      page,
      totalPage,
      ...(keyword && { keyword }),
    };
  }

  async updateArticle(id: number, payload: Partial<Article>, user: any): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (article.authorId !== user.id) {
      throw new BadRequestException('작성자만 수정할 수 있습니다');
    }
    const updatedArticle = await this.prisma.article.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
    return updatedArticle;
  }

  async deleteArticle(id: number, user: any): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (article.authorId !== user.id) {
      throw new BadRequestException('작성자만 삭제할 수 있습니다');
    }
    const deletedArticle = await this.prisma.article.delete({
      where: {
        id,
      },
    });
    return deletedArticle;
  }

  async likeArticle(id: number, user: any): Promise<IResponse<{ isLiked: boolean }>> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) {
      throw new BadRequestException('게시글이 존재하지 않습니다');
    }
    await this.prisma.article.update({
      where: {
        id,
      },
      data: {
        likes: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return {
      status: 200,
      message: '게시글 좋아요 성공',
      data: { isLiked: true },
    };
  }

  async unlikeArticle(id: number, user: any): Promise<IResponse<{ isLiked: boolean }>> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) {
      throw new BadRequestException('게시글이 존재하지 않습니다');
    }
    await this.prisma.article.update({
      where: {
        id,
      },
      data: {
        likes: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
    return {
      status: 200,
      message: '게시글 좋아요 취소 성공',
      data: { isLiked: false },
    };
  }

  async commentArticle(id: number, content: string, user: any, parentId?: number): Promise<IResponse<Comment[]>> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) {
      throw new BadRequestException('게시글이 존재하지 않습니다');
    }
    await this.prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        articleId: id,
        ...(parentId && { parentId }),
      },
    });
    const allComments = await this.prisma.comment.findMany({
      where: {
        articleId: id,
      },
    });
    return {
      status: 200,
      message: '댓글 작성 성공',
      data: allComments,
    };
  }

  async deleteComment(id: number, commentId: number, user: any): Promise<IResponse<Comment[]>> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new BadRequestException('댓글이 존재하지 않습니다');
    }
    if (comment.authorId !== user.id) {
      throw new BadRequestException('작성자만 삭제할 수 있습니다');
    }
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    const allComments = await this.prisma.comment.findMany({
      where: {
        articleId: id,
      },
    });
    return {
      status: 200,
      message: '댓글 삭제 성공',
      data: allComments,
    };
  }

  async getMyArticles(user: any): Promise<IResponse<ArticleWithAuthor[]>> {
    const articles = await this.prisma.article.findMany({
      where: {
        authorId: user.id,
      },
    });

    const articlesWithAuthor = articles.map(async article => {
      const author: Omit<User, 'password'> = await this.prisma.user.findUnique({
        where: {
          id: article.authorId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          division: true,
        },
      });
      return {
        author,
        ...article,
      };
    });

    return {
      status: 200,
      message: '내 게시글 조회 성공',
      data: await Promise.all(articlesWithAuthor),
    };
  }
}

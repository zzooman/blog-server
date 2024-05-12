import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Comment, Article } from '@prisma/client';
import { AuthGuard } from 'src/middleware/authGuard';
import { ArticleService } from 'src/services/article.service';
import {
  CreateArticleDto,
  CreateCommentDto,
  GetArticlesDto,
} from 'src/types/dto';
import { IResponse, ArticleDetail, ArticlesResponse } from 'src/types/types';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Request() req: Request & { user: any },
    @Body() body: CreateArticleDto,
  ): Promise<IResponse<Article>> {
    return await this.articleService.createArticle(body, req.user);
  }

  @Get('/:id')
  async read(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
  ): Promise<ArticleDetail> {
    return await this.articleService.getArticle(parseInt(id), req.user);
  }

  @Get()
  async readAll(@Query() query: GetArticlesDto): Promise<ArticlesResponse> {
    return await this.articleService.getAllArticles(
      Number(query.page),
      Number(query.offset),
      query.keyword,
    );
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
    @Body() body: CreateArticleDto,
  ): Promise<Article> {
    return await this.articleService.updateArticle(
      parseInt(id),
      body,
      req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
  ): Promise<Article> {
    return await this.articleService.deleteArticle(parseInt(id), req.user);
  }

  @Put('/:id/like')
  async like(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
  ): Promise<IResponse<{ isLiked: boolean }>> {
    return await this.articleService.likeArticle(parseInt(id), req.user);
  }

  @Put('/:id/unlike')
  async unlike(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
  ): Promise<IResponse<{ isLiked: boolean }>> {
    return await this.articleService.unlikeArticle(parseInt(id), req.user);
  }

  @Post('/:id/comment')
  async comment(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
    @Body() body: CreateCommentDto,
  ): Promise<IResponse<Comment[]>> {
    return await this.articleService.commentArticle(
      parseInt(id),
      body.content,
      req.user,
    );
  }

  @Delete('/:id/comment/:commentId')
  async deleteComment(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
    @Param('commentId') commentId: string,
  ): Promise<IResponse<Comment[]>> {
    return await this.articleService.deleteComment(
      parseInt(id),
      parseInt(commentId),
      req.user,
    );
  }
}

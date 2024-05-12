import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Post as IPost } from '@prisma/client';
import { AuthGuard } from 'src/middleware/authGuard';
import { ArticleService } from 'src/services/article.service';
import { CreateArticleDto } from 'src/types/dto';
import { IResponse } from 'src/types/types';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Request() req: Request & { user: any },
    @Body() body: CreateArticleDto,
  ): Promise<IResponse<IPost>> {
    return await this.articleService.createArticle(body, req.user);
  }

  @Get('/:id')
  async read(@Param('id') id: string): Promise<IPost> {
    return await this.articleService.getArticle(parseInt(id));
  }

  @Get()
  async readAll(): Promise<IPost[]> {
    return await this.articleService.getAllArticles();
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(
    @Request() req: Request & { user: any },
    @Param('id') id: string,
    @Body() body: CreateArticleDto,
  ): Promise<IPost> {
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
  ): Promise<IPost> {
    return await this.articleService.deleteArticle(parseInt(id), req.user);
  }
}

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

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Request() req: any,
    @Body() body: Partial<IPost>,
  ): Promise<IPost> {
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

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<IPost>,
  ): Promise<IPost> {
    return await this.articleService.updateArticle(parseInt(id), body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<IPost> {
    return await this.articleService.deleteArticle(parseInt(id));
  }
}

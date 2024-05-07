import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Post as IPost } from '@prisma/client';
import { ArticleService } from 'src/services/article.service';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/create')
  async createUser(@Body() body: Partial<IPost>): Promise<IPost> {
    return await this.articleService.createArticle(body);
  }

  @Get('/:id')
  async readUser(@Param('id') id: string): Promise<IPost> {
    return await this.articleService.getArticle(parseInt(id));
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<IPost>,
  ): Promise<IPost> {
    return await this.articleService.updateArticle(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<IPost> {
    return await this.articleService.deleteArticle(parseInt(id));
  }
}

import { Module } from '@nestjs/common';
import { ArticleController } from 'src/controllers/article.controller';
import { ArticleService } from 'src/services/article.service';

@Module({
  providers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}

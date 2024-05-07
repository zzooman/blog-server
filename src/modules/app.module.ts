import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { ArticleController } from 'src/controllers/article.controller';
import { ArticleService } from 'src/services/article.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
  controllers: [AppController, UserController, ArticleController],
  providers: [AppService, UserService, ArticleService],
})
export class AppModule {}

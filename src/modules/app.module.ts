import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import { ArticleModule } from './article.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
    ArticleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

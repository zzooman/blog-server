import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { HomeController } from 'src/controllers/home.controller';

@Module({
  imports: [],
  controllers: [AppController, HomeController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { HomeController } from 'src/controllers/home.controller';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [],
  controllers: [AppController, HomeController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

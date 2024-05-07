import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

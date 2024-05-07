import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}

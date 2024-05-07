import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';

@Module({
  providers: [UserController],
  exports: [UserService],
})
export class UserModule {}

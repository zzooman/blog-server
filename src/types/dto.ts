import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  division: $Enums.Division;
}

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  lowContent: string;

  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  published: boolean;
}

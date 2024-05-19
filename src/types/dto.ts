import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  division: $Enums.Division;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  username: string;

  @ApiProperty({ required: false })
  password: string;

  @ApiProperty({ required: false })
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
  rowContent: string;

  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  published: boolean;
}

export class CreateCommentDto {
  @ApiProperty()
  content: string;
}

export class GetArticlesDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  offset: number;

  @ApiProperty({ required: false })
  keyword?: string;
}

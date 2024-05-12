import { $Enums, Article, Comment } from '@prisma/client';

export interface User {
  id: number;
  username: string;
  password: string;
  division: $Enums.Division;
}

export interface MemberLoginResponse {
  memberNo: number;
  sellerNo: unknown;
  isLogin: boolean;
  isUnder14: boolean;
  isSellerApproved: unknown;
  userId: string;
  memberType: string;
  membershipGradeName: string;
  membershipGradeLevel: number;
  sellerCreditGradeCode: string;
  sellerCreditScore: number;
  name: string;
  isEmployee: boolean;
  employeeId: unknown;
  employeeTeam: unknown;
  gender: string;
  userExternalId: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  content: string;
  lowContent: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  isLiked: boolean;
  comments: Comment[];
}

export interface ArticlesResponse {
  articles: Article[];
  page: number;
  totalPage: number;
  keyword?: string;
}

export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

import { $Enums } from '@prisma/client';

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

export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

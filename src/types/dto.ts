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

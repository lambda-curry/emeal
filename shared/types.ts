export type ErrorDto = {
  errors: string[];
};

export type ProjectResponse = { project: ProjectDto };
export type ProjectDto = {
  id: string;
  name: string;
  website: string;
  createdAt: Date;
  coupon: CouponDto;
};

export type UserResponse = { user: UserDto };
export type UserDto = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type SessionResponse = { session: SessionDto };
export type SessionDto = {
  user: UserDto;
  projects: ProjectDto[];
};

export type CouponResponse = { coupon: CouponDto };
export type CouponDto = {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  image: string;
  description: string;
  expirationDate: Date;
  redeemedDate?: Date;
};

export type ForgotPasswordResponse = {
  message: 'Success';
};

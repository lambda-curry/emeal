export type ErrorDto = {
  errors: string[];
};

export type ProjectResponse = { project: ProjectDto };
export type ProjectDto = {
  id: string;
  name: string;
  website: string;
  createdAt: Date;
  coupon: CouponTemplateDto;
};

export type CouponTemplateDto = {
  title?: string;
  image?: string;
  description?: string;
  expirationDays?: number;
};

export type AnaltyicsResponse = { analytics: AnalyticsDto };
export type AnalyticsDto = {
  subscriberCount: number;
  redeemed30DayCount: number;
  subscriber30DayCount: number;
  pageViews30DayCount: number;
};

export type CustomerDto = {
  id: string;
  source: {
    id: string;
    lastFour: string;
    brand: string;
  };
};

export type PlanNames = 'basic' | 'pro' | 'restaurateur';

export type SubscriptionDto = {
  id: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date;
  trialEnd: Date;
};

export type StripeDto = {
  customer: CustomerDto;
  subscription: SubscriptionDto;
};

export type UserResponse = { user: UserDto };

export type UserDto = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  stripe: StripeDto;
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
  expirationDate: Date | string;
  redeemedDate?: Date | string;
};

export type ForgotPasswordResponse = {
  message: 'Success';
};

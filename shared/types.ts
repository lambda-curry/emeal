export type ProjectDto = {
  id: string;
  name: string;
  website: string;
  createdAt: Date;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

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

export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Organization = BaseEntity & {
  name: string;
};

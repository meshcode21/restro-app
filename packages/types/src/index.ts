export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export type ApiResponse<T> = 
  | { data: T; error?: never }
  | { data?: never; error: ApiError };

export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tenant = BaseEntity & {
  name: string;
};

export * from './auth';

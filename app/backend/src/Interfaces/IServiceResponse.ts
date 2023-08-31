export type ServiceResponseError = {
  status: 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT' | 'ERROR'
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponseMessage = {
  message: string
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;

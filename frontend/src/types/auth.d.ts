export interface RegisterFormFields {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginFormFields {
  email?: string;
  password?: string;
}

export interface RegisterFormErrors extends RegisterFormFields{};

export interface LoginFormErrors extends LoginFormFields{}

export interface SuccessfulAuthResponse {
  token: string;
  message: string;
  user:any
}

export interface UserSuccessResponse {
  message: string;
  user?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    __v: string;
  };
}

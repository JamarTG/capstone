export interface RegisterFormFields {
  email?: string;
  password?: string;
  confirmPassword?: string;
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
}

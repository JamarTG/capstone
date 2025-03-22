export interface FormFields {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface SuccessfulAuthResponse  {
    token : string,
    message: string
}

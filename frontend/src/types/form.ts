export type LoginFormFields = { email: string; password: string };
export type LoginFormErrors = { email?: string; password?: string };

export type RegisterFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type RegisterFormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

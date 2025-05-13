export interface PasswordUpdatePayload {
  password?: string;
  currentPassword?: string;
}

export interface PersInfoUpdatePayload {
  firstName: string;
  lastName: string;
  email: string;
}

export type PasswordUpdateFieldErrors = Partial<Record<keyof PasswordUpdatePayload,string>>
export type PersInfoUpdateFieldErrors = Partial<Record<keyof PersInfoUpdatePayload, string>>

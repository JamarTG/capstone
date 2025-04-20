export interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  currentPassword: string;
  darkMode: boolean;
}


export type UserProfileData = UserSettings & { createdAt:string};
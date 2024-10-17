export interface IUser {
  _id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  telegramId?: string;
  token?: string;
  hashPassword(password: string): Promise<string>;
}
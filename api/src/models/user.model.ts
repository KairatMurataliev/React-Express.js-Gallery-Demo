import {model, Model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import {IUser} from "../../types";

type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>({
  telegramId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  token: { type: String },
});

UserSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
};

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
import {model, Model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: string;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
}

export type UserModel = Model<IUser, {}, {}>;

const UserSchema: Schema = new Schema<IUser, UserModel>({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  avatar: {type: String},
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Default role is 'user'
});

UserSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
};

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
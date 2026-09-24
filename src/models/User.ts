import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  googleId?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    image: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'editor', 'user'],
      default: 'user',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

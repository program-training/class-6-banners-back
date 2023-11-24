import mongoose, { Document, Schema } from 'mongoose';
import { Users } from './interface';
import { api } from './server';

const userSchema = new Schema<Users>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { versionKey: false });

export { UserModel };

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(api!);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }


const UserModel = mongoose.model<Users>('banners', userSchema, 'users');
import mongoose, { Document, Schema } from 'mongoose';
import { Users, userSchema } from './interface';
import { api } from './server';



export { UserModel };

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(api);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }


const UserModel = mongoose.model<Users>('banners', userSchema, 'users');
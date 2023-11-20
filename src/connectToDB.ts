import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';
import { Users } from './interface';

const userSchema = new Schema<Users>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { versionKey: false });
// יצירת מודל משתמש
// // סכמת Joi למשתמש
// const userJoiSchema = Joi.object({
    //     username: Joi.string().min(3).max(30).required(),
//     password: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     isAdmin: Joi.boolean().required(),
// });
export { UserModel };

export const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://moshelapi:moshe206@cluster0.wdyimef.mongodb.net/banners?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }


const UserModel = mongoose.model<Users>('banners', userSchema, 'users');
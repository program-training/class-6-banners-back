import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

// הגדרת ממשק למשתמש
interface UserInterface {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

// סכמת Mongoose למשתמש
const userSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { versionKey: false });

// יצירת מודל משתמש
const UserModel = mongoose.model<UserInterface>('User', userSchema, 'users');

// סכמת Joi למשתמש
const userJoiSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean().required(),
});

export { UserModel, userJoiSchema };

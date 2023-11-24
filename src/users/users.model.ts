import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

interface UserInterface {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { versionKey: false });


const UserModel = mongoose.model<UserInterface>('User', userSchema, 'users');

//
const userJoiSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean().required(),
});

export { UserModel, userJoiSchema };

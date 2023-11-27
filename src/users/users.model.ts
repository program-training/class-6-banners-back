import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

export interface UserInterface {
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


const userJoiSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean().required(),
});

const changePasswordSchema = Joi.object({
    email: Joi.string().email().required(), 
    newPassword: Joi.string().min(5).required(), 
});


const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});
const registerUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean().required(), 
});

const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30),  
    password: Joi.string().min(5),          
    email: Joi.string().email(),            
    isAdmin: Joi.boolean(), 
});
export { UserModel, userJoiSchema,registerUserSchema,updateUserSchema,changePasswordSchema,loginUserSchema,resetPasswordSchema };

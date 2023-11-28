import usersService from './service.users';
import { Types } from 'mongoose';
import Joi from 'joi';
import { UserModel, changePasswordSchema, loginUserSchema, registerUserSchema, updateUserSchema } from './users.model';
import { generateUserPassword, comparePassword } from './secret'
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import usersDAL from './Dal.users';
import { secret_key, server } from '../server';
import { log } from 'console';
const path = require('path');
const nodemailer = require('nodemailer');

const generateToken = (userId: string) => {
    return jwt.sign({ userId }, secret_key, { expiresIn: '3h' });
};

const getAlllUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getUserByID = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
const registerUser = async (req: Request, res: Response) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        const newUser = req.body;
        const user = await usersService.registerUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};


const updateUserById = async (req: Request, res: Response) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = new Types.ObjectId(req.params.id);
    try {
        const updatedUserData = req.body;
        console.log("controller " + updatedUserData);
        const updatedUser = await usersService.updateUserById(userId, updatedUserData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { error } = loginUserSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await usersService.loginUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user.email);
        return res.status(200).json({ user, token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};


const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const result = await usersService.deleteUserById(userId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }


};
const changePassword = async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;

    const { error } = changePasswordSchema.validate({ email, newPassword });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await usersDAL.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const token = generateToken(user._id.toString());
        await usersService.saveTemporaryPasswordAndToken(email, newPassword, token);

        const verificationUrl = `${server}/api/users/verifypasswordchange?token=${token}`;

        try {
            await sendVerificationEmail(email, verificationUrl);
            res.status(200).json({ message: 'Verification email sent. Please check your email to confirm password change.' });
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            res.status(500).json({ message: 'Failed to send verification email.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An unknown error occurred' });
    }
};

const sendVerificationEmail = async (email: string, url: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'idoelishar81@gmail.com',
            pass: 'oqni opjs ggto cpjo'
        }
    });

    const mailOptions = {
        from: 'idoelishar81@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="${url}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
};

const verifyPasswordChange = async (req: Request, res: Response) => {
    const token = req.query.token;

    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Invalid token format' });
    }

    try {
        const result = await usersService.verifyPasswordChange(token);
        if (result.success) {
            console.log("hidden password");
            res.status(200).sendFile(path.join(__dirname, ''));
        } else {
            res.status(400).json({ message: 'Invalid or expired token.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during password verification.' });
    }
};









export default {
    getAlllUsers,
    registerUser,
    loginUser,
    getUserByID,
    updateUserById,
    deleteUserById,
    changePassword,
    verifyPasswordChange
}

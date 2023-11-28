import { Types } from 'mongoose';
import { UserModel } from './users.model'; 
import { UserInterface } from './users.model'; 
interface UserUpdateData extends Partial<UserInterface> {}

const usersDAL = {
  getAllUsers: async () => {
    try {
      return await UserModel.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      const user= await UserModel.findOne({ email });
      return user
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },
  saveTempPasswordAndToken: async (userId: Types.ObjectId, tempPassword: string, token: string) => {
    try {
      return await UserModel.findByIdAndUpdate(userId, 
        { 
          tempPassword: tempPassword,
          passwordResetToken: token,
          passwordResetExpires: new Date(Date.now() + 3600000) // זמן תפוגה של שעה אחת
        }, 
        { new: true });
    } catch (error) {
      throw error;
    }
},
findUserByPasswordResetToken: async (token: string) => {
  try {
    return await UserModel.findOne({ passwordResetToken: token });
  } catch (error) {
    console.error('Error finding user by password reset token:', error);
    throw error;
  }
},




 getUserById :async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
},
 getUserByMongoId :async (userId: Types.ObjectId) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
},

  updateUserById: async (userId: Types.ObjectId, updateData: UserUpdateData) => {
    try {
      return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  createUser: async (user: UserInterface) => {
    try {
      return await UserModel.create(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  deleteUserById: async (userId: string) => {
    try {
      return await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  savePasswordResetToken: async (userId:any, token:any, expiration:any) => {
    try {
      console.log('Saving password reset token for user:', userId);
      return await UserModel.findByIdAndUpdate(userId, 
        { 
          passwordResetToken: token,
          passwordResetExpires: expiration 
        }, 
        { new: true });
    } catch (error) {
      console.error('Error saving password reset token:', error);
      throw error;
    }
  },
  resetPasswordWithToken: async (token:any, newPassword:any) => {
    try {
      const user = await UserModel.findOne({ 
        passwordResetToken: token, 
        passwordResetExpires: { $gt: Date.now() } 
      });
  
      if (!user) {
        throw new Error('Password reset token is invalid or has expired.');
      }
  
      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
  
      return await user.save();
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },
};

export default usersDAL;











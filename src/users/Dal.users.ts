import { Types } from 'mongoose';
import { UserModel } from './users.model'; 

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
      return await UserModel.findOne({ email });
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },


 getUserById :async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);
        console.log("Found User:");
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
},
 getUserByMongoId :async (userId: Types.ObjectId) => {
    try {
        const user = await UserModel.findById(userId);
        console.log("Found User:");
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
},

  updateUserById: async (userId: Types.ObjectId, updateData: any) => {
    try {
      return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  createUser: async (user: any) => {
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

};

export default usersDAL;











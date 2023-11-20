import { Types } from 'mongoose';
import usersDAL from './Dal.users';
const crypto = require('crypto');

const usersService = {
  getAllUsers: async () => usersDAL.getAllUsers(),

  registerUser: async (user:any) => {
    const existingUser = await usersDAL.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Add the user
    const newUser = await usersDAL.createUser(user);
    if (!newUser) throw new Error("faild to create user");
    
    return { success: true, message: 'Registration successful', user: newUser };
  },
  getUserById: async (userId: string) => {
    const user = await usersDAL.getUserById(userId);
    console.log("service "+user);
    if (!user) {
      throw new Error('User not found.');
    }
    return { success: true, message: 'User retrieval successful', user };
  },
  deleteUserById: async (userId:string) => {
    const deletionResult = await usersDAL.deleteUserById(userId);
    if (!deletionResult) {
      throw new Error('Error deleting user.');
    }

    return { success: true, message: 'User deleted successfully' };
  },

  updateUserById: async (userId: Types.ObjectId, updateData: any) => {
    // Optional: Validate updateData or check if the user exists
    const existingUser = await usersDAL.getUserByMongoId(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    // Optional: Additional validation or processing
    // ...

    // Call DAL method to update the user
    const updatedUser = await usersDAL.updateUserById(userId, updateData);
    if (!updatedUser) {
      throw new Error('Error updating user.');
    }

    return { success: true, message: 'User updated successfully', user: updatedUser };
  },
  
  loginUser: async (email:any, password:any) => {
    const user = await usersDAL.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }

    return { success: true, message: 'Login successful', user };
  },
  
  // resetPassword: async (email:any, newPassword:any) => {
  //   // 1. בדוק אם המשתמש קיים במערכת
  //   const user = await usersDAL.getUserByEmail(email);
  //   if (!user) {
  //     throw new Error('User with this email does not exist.');
  //   }

  //   // 2. עדכון הסיסמה במסד הנתונים ללא הצפנה
  //   const updatedUser = await usersDAL.updateUserById(user._id, { password: newPassword });
  //   if (!updatedUser) {
  //     throw new Error('Failed to update user password.');
  //   }

  //   return { success: true, message: 'Password reset successfully' };
  // },

};
export default usersService;





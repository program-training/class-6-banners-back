import { Types } from 'mongoose';
import usersDAL from './Dal.users';
import { UserInterface } from './users.model';
const crypto = require('crypto');
const usersService = {
  getAllUsers: async () => usersDAL.getAllUsers(),

  registerUser: async (user:UserInterface) => {
    const existingUser = await usersDAL.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const newUser = await usersDAL.createUser(user);
    if (!newUser) throw new Error("faild to create user");
    
    return { success: true, message: 'Registration successful', user: newUser };
  },
  getUserById: async (userId: string) => {
    const user = await usersDAL.getUserById(userId);
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

  updateUserById: async (userId: Types.ObjectId, updateData: UserInterface) => {
    const existingUser = await usersDAL.getUserByMongoId(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    
    const updatedUser = await usersDAL.updateUserById(userId, updateData);
    if (!updatedUser) {
      throw new Error('Error updating user.');
    }

    return { success: true, message: 'User updated successfully', user: updatedUser };
  },
  loginUser: async (email:string, password:string) => {
    const user = await usersDAL.getUserByEmail(email);
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password.');
    }
    if (!user.isAdmin) {
        throw new Error('Access denied. Admin rights required.');
    }
    return { username: user.username, email: user.email,_id:user._id };
},


  changePassword: async (userId: string, newPassword: string) => {
    const user = await usersDAL.getUserById(userId);
    if (!user) {
      throw new Error('משתמש לא נמצא.');
    }

    const objectId = new Types.ObjectId(userId);

    const updatedUser = await usersDAL.updateUserById(objectId, { password: newPassword });
    if (!updatedUser) {
      throw new Error('שגיאה בעדכון הסיסמה.');
    }

    return { success: true, message: 'הסיסמה עודכנה בהצלחה' };
  },
  
  changePasswordByEmail: async (email: string, newPassword: string) => {
    const user = await usersDAL.getUserByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }
  
    const updatedUser = await usersDAL.updateUserById(user._id, { password: newPassword });
    
    if (!updatedUser) {
      throw new Error('Error updating password.');
    }
  
    return { success: true, message: 'The password has been successfully updated' };
  },
};
export default usersService;





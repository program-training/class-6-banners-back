import { Types } from 'mongoose';
import usersDAL from './Dal.users';
const crypto = require('crypto');
import { generateUserPassword, comparePassword } from './secret'

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
    if (!user || !comparePassword(password, user.password)) {
      throw new Error('Invalid email or password.');
    }
    if (!user.isAdmin) {
      throw new Error('Access denied. Admin rights required.');
    }
    return { username: user.username, email: user.email };
},

  changePassword: async (userId: string, newPassword: string) => {
    // בדיקה האם המשתמש קיים
    const user = await usersDAL.getUserById(userId);
    if (!user) {
      throw new Error('משתמש לא נמצא.');
    }

    // המרת המחרוזת ל-ObjectId
    const objectId = new Types.ObjectId(userId);

    // עדכון הסיסמה במסד הנתונים
    const updatedUser = await usersDAL.updateUserById(objectId, { password: newPassword });
    if (!updatedUser) {
      throw new Error('שגיאה בעדכון הסיסמה.');
    }

    return { success: true, message: 'הסיסמה עודכנה בהצלחה' };
  },
  
changePasswordByEmail: async (email: string, newPassword: string) => {
  // חיפוש המשתמש לפי ה-email
  const user = await usersDAL.getUserByEmail(email);
  console.log("user+ "+user);
  
  if (!user) {
    throw new Error('user not found');
  }

  // המרת הסיסמה החדשה
  const hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

  // עדכון הסיסמה במסד הנתונים
  const updatedUser = await usersDAL.updateUserById(user._id, { password: hashedNewPassword });
  console.log("update"+ updatedUser);
  
  if (!updatedUser) {
    throw new Error('Error updating password.');
  }

  return { success: true, message: '  The password has been successfully updated' };
},

};
export default usersService;





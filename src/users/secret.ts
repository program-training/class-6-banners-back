import { hashSync, compareSync } from "bcrypt";

export const generateUserPassword = (password: string) =>
    hashSync(password, 10);

export const comparePassword = (passwordFromClient: string, passwordFromDB: string) => {
    console.log('Comparing client password:', passwordFromClient, 'with DB password:', passwordFromDB);
    const result = compareSync(passwordFromClient, passwordFromDB);
    console.log('Comparison result:', result);
    return result;
};

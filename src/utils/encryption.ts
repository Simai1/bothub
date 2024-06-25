import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 8);
};

export const isPasswordMatch = async (password: string, userPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, userPassword);
};

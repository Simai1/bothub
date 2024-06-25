import {Role, User} from '@prisma/client';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import {encryptPassword} from '../utils/encryption';
import jwtUtils from '../utils/jwt';
import {RoleEnum, toNum} from "../config/role.config";

type JwtPayload = {
    id: string;
};
const createUser = async (name: string, email: string, password: string): Promise<User> => {
    if (await getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return prisma.user.create({
        data: {
            name,
            email,
            password: await encryptPassword(password),
        },
        include: {
            books: true,
        }
    });
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {email},
    });
};

const switchRole = async (id: string): Promise<User> => {
    const user = await getUserById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const updatedRole = Role[RoleEnum[toNum(user.role) ^ 3] as Role]; // переключение роли с помощью XOR
    return prisma.user.update({
        where: {id},
        data: {role: updatedRole},
    });
}

const getUserById = async (userId: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {id: userId},
    });
};

const getUserByRefreshToken = async (refreshToken: string): Promise<User> => {
    const userData = jwtUtils.decode(refreshToken) as JwtPayload;
    return (prisma.user.findUnique({
        where: {id: userData.id},
        include: {
            books: true,
        },
    }) as Promise<User>);
}

export default {
    createUser,
    getUserByEmail,
    getUserById,
    getUserByRefreshToken,
    switchRole,
};

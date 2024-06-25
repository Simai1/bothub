import { Token } from '@prisma/client';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import userService from './user.service';

const createToken = async (userId: string, refreshToken: string): Promise<Token> => {
    return prisma.token.create({
        data: {
            userId,
            refreshToken,
        },
    });
};

const getTokenByUserId = async (userId: string): Promise<Token | null> => {
    if (!(await userService.getUserById(userId))) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return prisma.token.findUnique({
        where: { userId },
    });
};

const updateRefreshToken = async (userId: string, newRefreshToken: string): Promise<Token> => {
    return prisma.token.update({
        where: { userId },
        data: { refreshToken: newRefreshToken },
    });
};

const getTokenByRefreshToken = async (refreshToken: string): Promise<Token | null> => {
    return prisma.token.findFirst({
        where: { refreshToken },
    });
};

const destroyTokenByRefreshToken = async (refreshToken: string): Promise<Token> => {
    const token = await getTokenByRefreshToken(refreshToken);
    return prisma.token.delete({
        where: { id: token?.id },
    });
};

export default {
    getTokenByUserId,
    updateRefreshToken,
    createToken,
    getTokenByRefreshToken,
    destroyTokenByRefreshToken,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = __importDefault(require("./user.service"));
const createToken = async (userId, refreshToken) => {
    return client_1.default.token.create({
        data: {
            userId,
            refreshToken,
        },
    });
};
const getTokenByUserId = async (userId) => {
    if (!(await user_service_1.default.getUserById(userId))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return client_1.default.token.findUnique({
        where: { userId },
    });
};
const updateRefreshToken = async (userId, newRefreshToken) => {
    return client_1.default.token.update({
        where: { userId },
        data: { refreshToken: newRefreshToken },
    });
};
const getTokenByRefreshToken = async (refreshToken) => {
    return client_1.default.token.findFirst({
        where: { refreshToken },
    });
};
const destroyTokenByRefreshToken = async (refreshToken) => {
    const token = await getTokenByRefreshToken(refreshToken);
    return client_1.default.token.delete({
        where: { id: token?.id },
    });
};
exports.default = {
    getTokenByUserId,
    updateRefreshToken,
    createToken,
    getTokenByRefreshToken,
    destroyTokenByRefreshToken,
};

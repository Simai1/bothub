"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_service_1 = __importDefault(require("../services/token.service"));
const ApiError_1 = __importDefault(require("./ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = __importDefault(require("../services/user.service"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const generate = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
        accessToken,
        refreshToken,
    };
};
const saveToken = async (userId, refreshToken) => {
    const tokenData = await token_service_1.default.getTokenByUserId(userId);
    if (tokenData) {
        return await token_service_1.default.updateRefreshToken(userId, refreshToken);
    }
    return await token_service_1.default.createToken(userId, refreshToken);
};
const removeToken = async (refreshToken) => {
    return await token_service_1.default.destroyTokenByRefreshToken(refreshToken);
};
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
};
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
};
const findToken = async (refreshToken) => {
    return await token_service_1.default.getTokenByRefreshToken(refreshToken);
};
const decode = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User  unauthorized');
    }
    const userData = verifyRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User  unauthorized');
    }
    const user = await user_service_1.default.getUserById(userData.id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const userDto = new user_dto_1.default(user);
    const tokens = generate({ ...userDto });
    await saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
};
exports.default = {
    generate,
    saveToken,
    removeToken,
    verifyAccessToken,
    verifyRefreshToken,
    findToken,
    decode,
    refresh,
};

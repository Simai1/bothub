"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = __importDefault(require("./user.service"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const encryption_1 = require("../utils/encryption");
const register = async (name, email, password) => {
    if (await user_service_1.default.getUserByEmail(email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    const user = await user_service_1.default.createUser(name, email, password);
    const userDto = new user_dto_1.default(user);
    const { accessToken, refreshToken } = jwt_1.default.generate({ ...userDto });
    await jwt_1.default.saveToken(user.id, refreshToken);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userDto,
    };
};
const login = async (email, password) => {
    if (!(await user_service_1.default.getUserByEmail(email))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const user = (await user_service_1.default.getUserByEmail(email));
    // if (!user || !user.validatePassword(password)) throw new ApiError(httpStatus.BAD_REQUEST, '');
    if (!(0, encryption_1.isPasswordMatch)(password, user.password)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Wrong password');
    }
    const userDto = new user_dto_1.default(user);
    const { accessToken, refreshToken } = jwt_1.default.generate({ ...userDto });
    await jwt_1.default.saveToken(user.id, refreshToken);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userDto,
    };
};
const logout = async (refreshToken) => {
    await jwt_1.default.removeToken(refreshToken);
};
const refresh = async (refreshToken) => {
    return await jwt_1.default.refresh(refreshToken);
};
exports.default = {
    register,
    login,
    logout,
    refresh,
};

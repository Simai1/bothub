"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client_2 = __importDefault(require("../client"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const encryption_1 = require("../utils/encryption");
const jwt_1 = __importDefault(require("../utils/jwt"));
const role_config_1 = require("../config/role.config");
const createUser = async (name, email, password) => {
    if (await getUserByEmail(email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    return client_2.default.user.create({
        data: {
            name,
            email,
            password: await (0, encryption_1.encryptPassword)(password),
        },
        include: {
            books: true,
        }
    });
};
const getUserByEmail = async (email) => {
    return client_2.default.user.findUnique({
        where: { email },
    });
};
const switchRole = async (id) => {
    const user = await getUserById(id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const updatedRole = client_1.Role[role_config_1.RoleEnum[(0, role_config_1.toNum)(user.role) ^ 3]]; // переключение роли с помощью XOR
    return client_2.default.user.update({
        where: { id },
        data: { role: updatedRole },
    });
};
const getUserById = async (userId) => {
    return client_2.default.user.findUnique({
        where: { id: userId },
    });
};
const getUserByRefreshToken = async (refreshToken) => {
    const userData = jwt_1.default.decode(refreshToken);
    return client_2.default.user.findUnique({
        where: { id: userData.id },
        include: {
            books: true,
        },
    });
};
exports.default = {
    createUser,
    getUserByEmail,
    getUserById,
    getUserByRefreshToken,
    switchRole,
};

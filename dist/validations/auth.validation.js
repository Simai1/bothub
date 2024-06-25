"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        name: joi_1.default.string().min(4).max(30),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),
};
const login = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
};
const refreshToken = {
    cookies: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required(),
    }),
};
exports.default = {
    register,
    login,
    refreshToken,
};

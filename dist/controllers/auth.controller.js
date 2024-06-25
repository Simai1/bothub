"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const register = (0, catchAsync_1.default)(async ({ body: { name, email, password } }, res) => {
    if (!name)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing name');
    if (!email)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing email');
    if (!password)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing password');
    const data = await auth_service_1.default.register(name, email, password);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(data);
});
const login = (0, catchAsync_1.default)(async ({ body: { email, password } }, res) => {
    if (!email)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing email');
    if (!password)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing password');
    const data = await auth_service_1.default.login(email, password);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(data);
});
const logout = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    await auth_service_1.default.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json({ status: 'OK' });
});
const refresh = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const data = await auth_service_1.default.refresh(refreshToken);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(data);
});
exports.default = {
    register,
    login,
    logout,
    refresh,
};

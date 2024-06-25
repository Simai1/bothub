"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_service_1 = __importDefault(require("../services/user.service"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const getProfile = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const user = new user_dto_1.default(await user_service_1.default.getUserByRefreshToken(refreshToken));
    res.json(user);
});
const switchRole = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!id)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing id');
    const user = new user_dto_1.default(await user_service_1.default.switchRole(id));
    res.json(user);
});
exports.default = {
    getProfile,
    switchRole,
};

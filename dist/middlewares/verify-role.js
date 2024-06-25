"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_service_1 = __importDefault(require("../services/user.service"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const role_config_1 = require("../config/role.config");
const verifyRole = (role) => (0, catchAsync_1.default)(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    const user = await user_service_1.default.getUserByRefreshToken(refreshToken);
    if (!user) {
        return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User unauthorized'));
    }
    if (((0, role_config_1.toNum)(role) & (0, role_config_1.toNum)(user.role)) !== (0, role_config_1.toNum)(user.role)) { // Логическое AND для проверки
        return next(new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden action'));
    }
    return next();
});
exports.default = verifyRole;

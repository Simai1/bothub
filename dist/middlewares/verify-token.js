"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const auth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User unauthorized'));
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User unauthorized'));
        }
        const userData = jwt_1.default.verifyAccessToken(accessToken);
        if (!userData) {
            return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User unauthorized'));
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User unauthorized'));
    }
};
exports.default = {
    auth: auth,
};

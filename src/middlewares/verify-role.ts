import { NextFunction, Request, Response } from 'express';
import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import {Role} from "@prisma/client";
import {toNum} from '../config/role.config';

const verifyRole = (role: Role) => catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.cookies;
    const user = await userService.getUserByRefreshToken(refreshToken);
    if (!user) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'User unauthorized'));
    }
    if ((toNum(role) & toNum(user.role)) !== toNum(user.role)){  // Логическое AND для проверки
        return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden action'));
    }
    return next();
});

export default verifyRole;

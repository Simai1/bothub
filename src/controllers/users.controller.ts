import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import {Role} from "@prisma/client";
import UserDto, {IUser} from "../dtos/user-dto";

const getProfile = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies;
    const user = new UserDto(await userService.getUserByRefreshToken(refreshToken) as IUser);
    res.json(user);
});

const switchRole = catchAsync(async (req, res) => {
    const {id} = req.params;
    if (!id) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
    const user = new UserDto(await userService.switchRole(id) as IUser);
    res.json(user);
});

export default {
    getProfile,
    switchRole,
}

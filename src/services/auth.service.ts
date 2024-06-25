import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import userService from './user.service';
import jwtUtil from '../utils/jwt';
import UserDto, {IUser} from '../dtos/user-dto';
import {isPasswordMatch} from '../utils/encryption';

type data = {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
};
const register = async (name: string, email: string, password: string): Promise<data> => {
    if (await userService.getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await userService.createUser(name, email, password) as IUser;
    const userDto = new UserDto(user);
    const {accessToken, refreshToken} = jwtUtil.generate({...userDto});
    await jwtUtil.saveToken(user.id, refreshToken);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userDto,
    };
};

const login = async (email: string, password: string): Promise<data> => {
    if (!(await userService.getUserByEmail(email))) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const user = (await userService.getUserByEmail(email)) as IUser;
    // if (!user || !user.validatePassword(password)) throw new ApiError(httpStatus.BAD_REQUEST, '');
    if (!isPasswordMatch(password, user.password)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password');
    }
    const userDto = new UserDto(user);
    const {accessToken, refreshToken} = jwtUtil.generate({...userDto});

    await jwtUtil.saveToken(user.id, refreshToken);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userDto,
    };
};

const logout = async (refreshToken: string): Promise<void> => {
    await jwtUtil.removeToken(refreshToken);
};

const refresh = async (refreshToken: string): Promise<data> => {
    return await jwtUtil.refresh(refreshToken);
};


export default {
    register,
    login,
    logout,
    refresh,
};

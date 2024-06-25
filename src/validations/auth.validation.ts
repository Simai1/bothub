import Joi from 'joi';

const register = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(4).max(30),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const refreshToken = {
    cookies: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

export default {
    register,
    login,
    refreshToken,
};

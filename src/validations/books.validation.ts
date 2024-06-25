import Joi from 'joi';

const create = {
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30).required(),
        author: Joi.string().min(3).max(20).required(),
        publicationDate: Joi.date().required(),
        genres: Joi.array().required(),
        userId: Joi.string().uuid().required(),
    })
};

const id = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required(),
    })
};

const update = {
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30),
        author: Joi.string().min(3).max(20),
        publicationDate: Joi.date(),
        genres: Joi.array(),
        userId: Joi.string().uuid(),
    })
};


export default {
    create,
    id,
    update,
};

import Joi from 'joi';

const id = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required(),
    })
};

export default {
    id,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().min(2).max(30).required(),
        author: joi_1.default.string().min(3).max(20).required(),
        publicationDate: joi_1.default.date().required(),
        genres: joi_1.default.array().required(),
        userId: joi_1.default.string().uuid().required(),
    })
};
const id = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().uuid().required(),
    })
};
const update = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().min(2).max(30),
        author: joi_1.default.string().min(3).max(20),
        publicationDate: joi_1.default.date(),
        genres: joi_1.default.array(),
        userId: joi_1.default.string().uuid(),
    })
};
exports.default = {
    create,
    id,
    update,
};

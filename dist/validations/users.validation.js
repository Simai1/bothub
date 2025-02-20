"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().uuid().required(),
    })
};
exports.default = {
    id,
};

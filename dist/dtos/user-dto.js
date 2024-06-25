"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_dto_1 = __importDefault(require("./books-dto"));
class UserDto {
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.role = model.role;
        this.books = model.books ? model.books.map(book => new books_dto_1.default(book)) : [];
    }
}
exports.default = UserDto;

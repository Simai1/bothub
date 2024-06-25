"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBook = async (title, author, publicationDate, genres, userId) => {
    const book = await findBooksByTitle(title);
    if (book) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book with this title already exists');
    }
    return client_1.default.book.create({
        data: {
            title,
            author,
            publicationDate,
            genres,
            userId: userId ? userId : null,
        }
    });
};
const getAll = async () => {
    return client_1.default.book.findMany();
};
const getBookById = async (id) => {
    const checkBook = await findBookById(id);
    if (!checkBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book with this id not found');
    }
    return checkBook;
};
const updateBookById = async (id, title, author, publicationDate, genres, userId) => {
    const book = await findBookById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book with this id not found');
    }
    return client_1.default.book.update({
        where: { id },
        data: { title, author, publicationDate, genres, userId }
    });
};
const deleteBookById = async (id) => {
    const book = await findBookById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book with this id not found');
    }
    await client_1.default.book.delete({ where: { id } });
};
const findBookById = async (bookId) => {
    return client_1.default.book.findUnique({
        where: { id: bookId }
    });
};
const findBooksByTitle = async (title) => {
    return client_1.default.book.findUnique({
        where: { title },
    });
};
exports.default = {
    createBook,
    getAll,
    getBookById,
    updateBookById,
    deleteBookById,
};

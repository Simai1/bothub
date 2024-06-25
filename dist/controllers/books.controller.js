"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const books_service_1 = __importDefault(require("../services/books.service"));
const books_dto_1 = __importDefault(require("../dtos/books-dto"));
const createBook = (0, catchAsync_1.default)(async (req, res) => {
    const { title, author, publicationDate, genres, userId } = req.body;
    if (!req.body) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing body');
    }
    if (!title)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing title');
    if (!author)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing author');
    if (!publicationDate)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing publicationDate');
    if (!genres)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing genres');
    const book = new books_dto_1.default(await books_service_1.default.createBook(title, author, publicationDate, genres, userId));
    res.json(book);
});
const getAllBooks = (0, catchAsync_1.default)(async (req, res) => {
    const books = await books_service_1.default.getAll();
    const booksDtos = books.map(book => new books_dto_1.default(book));
    res.json(booksDtos);
});
const getBook = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing id');
    }
    const book = new books_dto_1.default(await books_service_1.default.getBookById(id));
    res.json(book);
});
const updateBook = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!req.body) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing body');
    }
    const { title, author, publicationDate, genres, userId } = req.body;
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing id');
    }
    const book = new books_dto_1.default(await books_service_1.default.updateBookById(id, title, author, publicationDate, genres, userId));
    res.json(book);
});
const deleteBook = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing id');
    }
    await books_service_1.default.deleteBookById(id);
    res.json({ status: 'OK' });
});
exports.default = {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
};

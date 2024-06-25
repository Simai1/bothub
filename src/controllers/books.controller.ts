import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import booksService from "../services/books.service";
import BooksDto from "../dtos/books-dto";

const createBook = catchAsync(async (req, res) => {
    const {title, author, publicationDate, genres, userId} = req.body;
    if (!req.body){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing body');
    }
    if (!title) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing title');
    if (!author) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing author');
    if (!publicationDate) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing publicationDate');
    if (!genres) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing genres');
    const book = new BooksDto(await booksService.createBook(title, author, publicationDate, genres, userId));
    res.json(book);
});

const getAllBooks = catchAsync(async (req, res) => {
    const books = await booksService.getAll();
    const booksDtos = books.map(book => new BooksDto(book));
    res.json(booksDtos);
});

const getBook = catchAsync(async (req, res) => {
    const {id} = req.params;
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
    }
    const book = new BooksDto(await booksService.getBookById(id));
    res.json(book);
});

const updateBook = catchAsync(async (req, res) => {
    const {id} = req.params;
    if (!req.body){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing body');
    }
    const {title, author, publicationDate, genres, userId} = req.body;
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
    }
    const book = new BooksDto(await booksService.updateBookById(id, title, author, publicationDate, genres, userId));
    res.json(book);
});

const deleteBook = catchAsync(async (req, res) => {
    const {id} = req.params;
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
    }
    await booksService.deleteBookById(id);
    res.json({status: 'OK'});
});

export default {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
};

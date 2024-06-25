import prisma from "../client";
import {Book} from "@prisma/client";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";


const createBook = async (title: string, author: string, publicationDate: Date, genres: string[], userId: string): Promise<Book> => {
    const book = await findBooksByTitle(title);
    if (book) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book with this title already exists');
    }
    return prisma.book.create({
        data: {
            title,
            author,
            publicationDate,
            genres,
            userId: userId ? userId : null,
        }
    });
};

const getAll = async (): Promise<Book[]> => {
    return prisma.book.findMany();
};

const getBookById = async (id: string): Promise<Book> => {
    const checkBook = await findBookById(id);
    if (!checkBook) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book with this id not found');
    }
    return checkBook;
};

const updateBookById = async (id: string, title?: string, author?: string, publicationDate?: Date, genres?: string[], userId?: string): Promise<Book> => {
    const book = await findBookById(id);
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book with this id not found');
    }
    return prisma.book.update({
        where: {id},
        data: {title, author, publicationDate, genres, userId}
    });
};

const deleteBookById = async (id: string): Promise<void> => {
    const book = await findBookById(id);
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book with this id not found');
    }
    await prisma.book.delete({where: {id}});
}

const findBookById = async (bookId: string): Promise<Book | null> => {
    return prisma.book.findUnique({
        where: {id: bookId}
    });
};

const findBooksByTitle = async (title: string): Promise<Book | null> => {
    return prisma.book.findUnique({
        where: {title},
    })
};

export default {
    createBook,
    getAll,
    getBookById,
    updateBookById,
    deleteBookById,
}

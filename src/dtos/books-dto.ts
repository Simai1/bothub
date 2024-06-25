import {Book} from "@prisma/client";
import UserDto from "./user-dto";

export default class BooksDto {
    id: string;
    title: string;
    author: string;
    publicationDate: Date;
    genres: string[];

    constructor(model: Book) {
        this.id = model.id;
        this.title = model.title;
        this.author = model.author;
        this.publicationDate = model.publicationDate;
        this.genres = model.genres;
    }
}

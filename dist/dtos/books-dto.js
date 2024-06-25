"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooksDto {
    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.author = model.author;
        this.publicationDate = model.publicationDate;
        this.genres = model.genres;
    }
}
exports.default = BooksDto;

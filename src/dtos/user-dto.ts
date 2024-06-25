import {Book, Role, User} from '@prisma/client';
import BooksDto from "./books-dto";

export interface IUser extends User{
    books: Book[],
}
export default class UserDto {
    id: string;
    name: string;
    email: string;
    role: Role;
    books: object[];

    constructor(model: IUser) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.role = model.role;
        this.books = model.books? model.books.map(book => new BooksDto(book)) : [];
    }
}

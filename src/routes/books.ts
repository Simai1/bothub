import {Router} from 'express';
import booksController from "../controllers/books.controller";
import validate from '../middlewares/validate';
import booksValidation from "../validations/books.validation";
import verifyRole from "../middlewares/verify-role";
import {Role} from "@prisma/client";
import verifyToken from "../middlewares/verify-token";


const router: Router = Router();

router.route('/')
    .post(verifyRole(Role.ADMIN), validate(booksValidation.create), booksController.createBook)
    .get(booksController.getAllBooks)
router.route('/:id')
    .get(verifyToken.auth, validate(booksValidation.id), booksController.getBook)
    .put(verifyToken.auth, validate(booksValidation.id), validate(booksValidation.update), booksController.updateBook)
    .delete(verifyToken.auth, validate(booksValidation.id), booksController.deleteBook)

export default router;

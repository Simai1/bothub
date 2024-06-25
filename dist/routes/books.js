"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const books_validation_1 = __importDefault(require("../validations/books.validation"));
const verify_role_1 = __importDefault(require("../middlewares/verify-role"));
const client_1 = require("@prisma/client");
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const router = (0, express_1.Router)();
router.route('/')
    .post((0, verify_role_1.default)(client_1.Role.ADMIN), (0, validate_1.default)(books_validation_1.default.create), books_controller_1.default.createBook)
    .get(books_controller_1.default.getAllBooks);
router.route('/:id')
    .get(verify_token_1.default.auth, (0, validate_1.default)(books_validation_1.default.id), books_controller_1.default.getBook)
    .put(verify_token_1.default.auth, (0, validate_1.default)(books_validation_1.default.id), (0, validate_1.default)(books_validation_1.default.update), books_controller_1.default.updateBook)
    .delete(verify_token_1.default.auth, (0, validate_1.default)(books_validation_1.default.id), books_controller_1.default.deleteBook);
exports.default = router;

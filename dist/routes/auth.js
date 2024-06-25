"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_validation_1 = __importDefault(require("../validations/auth.validation"));
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const router = (0, express_1.Router)();
router.route('/register').post((0, validate_1.default)(auth_validation_1.default.register), auth_controller_1.default.register);
router.route('/login').post((0, validate_1.default)(auth_validation_1.default.login), auth_controller_1.default.login);
router.route('/logout').post(verify_token_1.default.auth, (0, validate_1.default)(auth_validation_1.default.refreshToken), auth_controller_1.default.logout);
router.route('/refresh').get((0, validate_1.default)(auth_validation_1.default.refreshToken), auth_controller_1.default.refresh);
exports.default = router;

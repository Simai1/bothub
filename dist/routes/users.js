"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middlewares/validate"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const users_validation_1 = __importDefault(require("../validations/users.validation"));
const verify_role_1 = __importDefault(require("../middlewares/verify-role"));
const client_1 = require("@prisma/client");
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const router = (0, express_1.Router)();
router.route('/me').get(verify_token_1.default.auth, users_controller_1.default.getProfile);
router.route('/:id/role').put((0, verify_role_1.default)(client_1.Role.ADMIN), (0, validate_1.default)(users_validation_1.default.id), users_controller_1.default.switchRole);
exports.default = router;

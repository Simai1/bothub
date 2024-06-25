"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNum = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum[RoleEnum["USER"] = 1] = "USER";
    RoleEnum[RoleEnum["ADMIN"] = 2] = "ADMIN";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
const toNum = (role) => RoleEnum[role];
exports.toNum = toNum;

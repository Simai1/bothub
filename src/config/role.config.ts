import {Role} from "@prisma/client";

export enum RoleEnum {
    "USER" = 1, // 01 => 1 бит отвечает за права пользователя
    "ADMIN" = 2, // 10 => 2 бит отвечает за права администратора
}
export const toNum = (role: Role) => RoleEnum[role as keyof typeof RoleEnum];

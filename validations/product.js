import { body } from "express-validator";

export const productCreateValidator = [
    body("name","Неверное имя пользователя").isString(),
    body("price","Неверно задана цена").isNumeric(),
    body("picture","Неверное ссылка на изображение").optional().isString(),
    body("description","Неверно задано описание").isString(),
    body("info","Неверно задана информация о товаре").optional().isObject(),
]
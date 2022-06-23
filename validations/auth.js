import { body } from "express-validator";

export const registerValidator = [
    body("email","Неверный формат почты").isEmail(),
    body('password',"Пароль минимум 4 символа").isLength({min: 4})
]
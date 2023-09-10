import * as Yup from "yup"

export const registerSchema = Yup.object().shape({
    firstName: Yup.string().required().min(3),
    lastName: Yup.string().required().min(3),
    username: Yup.string().required().min(4),
    password: Yup.string().required().min(6)
})
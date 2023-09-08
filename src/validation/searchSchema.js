
import * as Yup from "yup"
export const searchSchema = Yup.object().shape({
    searchValue: Yup.string().min(1)
})


import { useSelector } from "react-redux";


export const useAddPost = () => useSelector(state => state.addPost)
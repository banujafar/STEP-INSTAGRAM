import store from "../store";
import { appendModal, deleteModal } from "../store/modalSlice";




export const handleAppendModal = (modalName, data=false) => store.dispatch(appendModal({modalName, data}))
export const handleDeleteModal = () => store.dispatch(deleteModal())


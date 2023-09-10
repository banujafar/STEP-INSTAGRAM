import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    modals: []
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        appendModal: (state, action) => {
            
            state.modals.push(action.payload)
        },
        deleteModal: (state) => {
            state.modals.slice(0, state.modals.length - 1)
        }
    }
})

export default modalSlice.reducer
export const {appendModal, deleteModal} = modalSlice.actions
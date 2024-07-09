import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store/Store";

// Define a type for the slice state
interface modalState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: modalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true; 
      
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const isOpen = (state: RootState) => state.modal.isOpen


export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store/Store";
// Define a type for the slice state
interface UserMode {
  role: string;
}

// Define the initial state using that type
const initialState: UserMode = {
  role: "",
};

export const stateSlice = createSlice({
  name: "mode",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    stateStatus: (state, action) => {
      localStorage.setItem("role", action.payload);
      state.role = action.payload;
    },
  },
});

export const { stateStatus} = stateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userMode = (state: RootState) => state.mode.role;

export default stateSlice.reducer;

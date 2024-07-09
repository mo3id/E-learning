import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentInfoInterface } from "../../Services/Interfaces/student";
import axios_common from "../../Services/api";
import { RootState } from "../Store/Store";

export const getInfoByStudent : any = createAsyncThunk(
    "student/id",
    async (student : any, { rejectWithValue }) => {

      return await axios_common
        .get(`Students/${student}`)
        .then((res) => res.data.data)
        .catch((err) => rejectWithValue(err.response.data.message));
    }
  );


interface StudentState {
    error: any
    isLoading: boolean
    studentInfo: StudentInfoInterface
  
  }

  // Define the initial state using that type
  const initialState: StudentState = {
    error: "",
    isLoading: false,
    studentInfo:{},
  
  };


  export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
    // get student information by id
      builder.addCase(getInfoByStudent.pending, (state) => {
        state.isLoading = true;
      })


      .addCase(getInfoByStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentInfo = action.payload;
        
      })
      .addCase(getInfoByStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      });

    }
})

export const studentReducer = studentSlice.reducer;
export const studentInfo = (state: RootState) => state.student.studentInfo
export const isLoading = (state: RootState) => state.student.isLoading


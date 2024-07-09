import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios_common from "../../Services/api";
import { RootState } from "../Store/Store";

type HomePageTypes = {
  coursesData: [];
  errors: {
    coursesError: string;
  };
  loading: {
    coursesLoading: boolean;
  };
  reqStatus: {
    coursesStatus: boolean;
  };
  isLoggedIn: boolean;
};

const initialState: HomePageTypes = {
  coursesData: [],
  errors: {
    coursesError: "",
  },
  loading: {
    coursesLoading: false,
  },
  reqStatus: {
    coursesStatus: false,
  },
  isLoggedIn: false,
};

export const handleCourseCards = createAsyncThunk(
  "homePage/handleCourseCards",
  async (_, { rejectWithValue }) => {
    return await axios_common
      .get("Courses")
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCourseCards.pending, (state) => {
        state.loading.coursesLoading = true;
        state.reqStatus.coursesStatus = true;
      })
      .addCase(handleCourseCards.fulfilled, (state, action) => {
        state.coursesData = action.payload;
        state.loading.coursesLoading = false;
      })
      .addCase(handleCourseCards.rejected, (state) => {
        state.reqStatus.coursesStatus = false;
      });
  },
});

export const coursesData = (state: RootState) => state.homePage.coursesData;

export const HomePage = (state: RootState) => state.homePage;

export default homePageSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseInterFace } from "../../Services/Interfaces/course";
import { RootState } from "../Store/Store";
import axios_common from "../../Services/api";

interface CourseSliceData {
  allCoursesData: CourseInterFace[];
  courseData: CourseInterFace;
  error: string | null | undefined;
}

const initialState: CourseSliceData = {
  courseData: {},
  allCoursesData: [],
  error: null,
};

export const handleCreateCourse = createAsyncThunk(
  "course/createCourse",
  async (values: CourseInterFace, { rejectWithValue }) => {
    axios_common.defaults.headers["Content-Type"] = "multipart/form-data";
    return await axios_common
      .post("Courses", values)
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (id: number | string, { rejectWithValue }) => {
    return await axios_common
      .get(`Courses/${id}`)
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const handleEditCourse = createAsyncThunk(
  "course/handleEditCourse",
  async (values: CourseInterFace, { rejectWithValue }) => {
    axios_common.defaults.headers["Content-Type"] = "multipart/form-data";

    return await axios_common
      .post(`Courses/${values.id}`, { ...values, _method: "PUT" })
      .then(({ data }) => console.log(data))
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async (_, { rejectWithValue }) => {
    return await axios_common
      .get("/view-my-courses")
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.responses.data.message));
  }
);

// export const fetchStudentCourses = createAsyncThunk(
//   "course/fetchStudentCourses",
//   async (_, { rejectWithValue }) => {
//     return await axios_common
//       .get("/view-my-courses")
//       .then(({ data }) => data.data)
//       .catch((err) => rejectWithValue(err.responses.data.message));
//   }
// );

export const viewDetails = createAsyncThunk(
  "course/viewDetails",
  async (id: string | undefined, { rejectWithValue }) => {
    return await axios_common
      .get(`Courses/${id}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const getStudentassesment = createAsyncThunk(
  "course/getStudentassesment",
  async (id: number | string, { rejectWithValue }) => {
    return await axios_common
      .get(`Students/${id}`)
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const coursesSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.allCoursesData = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.pending, () => {
        // console.log(state, "pending");
      })
      .addCase(fetchCourses.rejected, (state) => {
        // console.log(action, "rejected");
        // state.error = action.payload;
        state.allCoursesData = [];
      });

    // builder
    //   .addCase(fetchStudentCourses.fulfilled, (state, action) => {
    //     state.allCoursesData = action.payload;
    //     state.error = null;
    //   })
    //   .addCase(fetchStudentCourses.pending, (state) => {
    //     console.log(state, "pending");
    //   })
    //   .addCase(fetchStudentCourses.rejected, (state, action) => {
    //     console.log(action, "rejected");
    //     // state.error = action.payload;
    //     state.allCoursesData = [];
    //   });

    builder
      .addCase(getCourse.fulfilled, (state, action) => {
        state.courseData = action.payload;
        state.error = null;
      })
      .addCase(getCourse.pending, () => {
        // console.log(state, "pending");
      })
      .addCase(getCourse.rejected, (state) => {
        // console.log(action, "rejected");
        // state.error = action.payload;
        state.allCoursesData = [];
      });

    builder
      .addCase(getStudentassesment.fulfilled, (state, action) => {
        state.allCoursesData = action.payload.courses;
        state.error = null;
      })
      .addCase(getStudentassesment.pending, () => {
        // console.log(state, "pending");
      })
      .addCase(getStudentassesment.rejected, (state) => {
        // console.log(action, "rejected");
        // state.error = action.payload;
        state.allCoursesData = [];
      });

    builder
      .addCase(handleCreateCourse.fulfilled, (state, action) => {
        state.courseData = action.payload;
        state.error = null;
      })
      .addCase(handleCreateCourse.pending, () => {
        // console.log(state, "pending");
      })
      .addCase(handleCreateCourse.rejected, (state) => {
        // console.log(action, "rejected");
        // state.error = action.payload;
        state.allCoursesData = [];
      });

    builder.addCase(viewDetails.fulfilled, (state, action) => {
      state.courseData = action.payload.data;
      // console.log(action.payload);
    });
  },
});

export const courseData = (state: RootState) => state.course.courseData;
export const allCoursesData = (state: RootState) => state.course.allCoursesData;
export default coursesSlice.reducer;

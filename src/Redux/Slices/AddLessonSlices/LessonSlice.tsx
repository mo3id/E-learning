import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios_common from "../../../Services/api";
import { RootState, store } from "../../Store/Store";
import { lessonsType } from "../../../Services/Interfaces/modalTypes";

type LessonTypes = {
  lessonData: {
    name: string;
    description: string;
    course_id: number;
    module_id: string;
  };
  editData: lessonsType;
  isEditMode:boolean;
  errors: {
    coursesError: string;
  };
  loading: {
    lessonLoading: boolean;
  };
  isLoggedIn: boolean;
};

const initialState: LessonTypes = {
  lessonData: {
    name: "",
    description: "",
    course_id: 0,
    module_id: "",
  },
  editData: {},
  isEditMode: false,
  errors: {
    coursesError: "",
  },
  loading: {
    lessonLoading: false,
  },
  isLoggedIn: false,
};

export const handleEditLesson = createAsyncThunk(
  "lesson/handleEditLesson",
  async (lessonData: object, { rejectWithValue }) => {
    const data = {
      ...lessonData,
    };
    delete data.id;
    console.log(data);

    axios_common.defaults.headers["Content-Type"] = "multipart/form-data";

    // console.log(data);
    return await axios_common
      .post(`Lessons/${lessonData.id}`, { ...data, _method: "PUT" })
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const handleAddLesson = createAsyncThunk(
  "lesson/handleAddLesson",
  async (lessonData: object, { rejectWithValue }) => {
    console.log('sdddddddddddddddddddddddd');
    
    console.log(lessonData);
    const course_id = store.getState().lesson.lessonData.course_id;
    const module_id = store.getState().lesson.lessonData.module_id;
    const data = {
      course_id,
      module_id,
      ...lessonData,
    };
    console.log(data);

    axios_common.defaults.headers["Content-Type"] = "multipart/form-data";

    // console.log(data);
    return await axios_common
      .post("Lessons", data)
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const handleDeleteLesson = createAsyncThunk(
  "lesson/handleDeleteLesson",
  async (lessonId: string, { rejectWithValue }) => {
    return await axios_common
      .post(`Lessons/${lessonId}`, {_method: "delete"})
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);
export const handleDeleteResource = createAsyncThunk(
  "lesson/handleDeleteResource",
  async (resourceId: string, { rejectWithValue }) => {
    return await axios_common
      .post(`Resource/${resourceId}/delete`, { _method: "delete" })
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessonData: (state, action) => {
      state.lessonData.module_id = action.payload.moduleId;
      state.lessonData.course_id = action.payload.courseId;
    },
    setEditLessonData: (state, action) => {
      console.log(action.payload);
      state.editData = action.payload;
      state.isEditMode = true;
    },
    clearEditLessonData: (state) => {
      console.log("clear");
      state.editData = {};
      state.isEditMode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAddLesson.pending, (state) => {
        state.loading.lessonLoading = true;
      })
      .addCase(handleAddLesson.fulfilled, (state, action) => {
        state.lessonData = action.payload;
        state.loading.lessonLoading = false;
      })
      .addCase(handleAddLesson.rejected, (state, action) => {
        console.log(action.payload, "rejected");
        state.loading.lessonLoading = false;
      })
      .addCase(handleEditLesson.pending, (state) => {
        state.loading.lessonLoading = true;
      })
      .addCase(handleEditLesson.fulfilled, (state, action) => {
        state.lessonData = action.payload;
        state.loading.lessonLoading = false;
      })
      .addCase(handleEditLesson.rejected, (state, action) => {
        console.log(action.payload, "rejected");
        state.loading.lessonLoading = false;
      })
      .addCase(handleDeleteLesson.pending, (state) => {
        state.loading.lessonLoading = true;
      })
      .addCase(handleDeleteLesson.fulfilled, (state, action) => {
        console.log(action);
        state.loading.lessonLoading = false;
      })
      .addCase(handleDeleteLesson.rejected, (state, action) => {
        console.log(action.payload, "rejected");
        state.loading.lessonLoading = false;
      })
      .addCase(handleDeleteResource.pending, (state) => {
        state.loading.lessonLoading = true;
      })
      .addCase(handleDeleteResource.fulfilled, (state, action) => {
        console.log(action);
        state.loading.lessonLoading = false;
      })
      .addCase(handleDeleteResource.rejected, (state, action) => {
        console.log(action.payload, "rejected");
        state.loading.lessonLoading = false;
      });
  },
});

export const lessonData = (state: RootState) => state.lesson.lessonData;
export const courseId = (state: RootState) => state.lesson.lessonData.course_id;
export const moduleId = (state: RootState) => state.lesson.lessonData.module_id;
export const editData = (state: RootState) => state.lesson.editData;

export const LessonEditData = (state: RootState) => state.lesson.editData;
export const isEditMode = (state: RootState) => state.lesson.isEditMode;
export const { setEditLessonData, clearEditLessonData } = lessonSlice.actions;

export default lessonSlice.reducer;
export const { setLessonData } = lessonSlice.actions;

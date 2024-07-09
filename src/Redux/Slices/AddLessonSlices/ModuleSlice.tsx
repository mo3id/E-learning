import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios_common from "../../../Services/api";
import { RootState } from "../../Store/Store";
import { ModuleTypes, lessonsType } from "../../../Services/Interfaces/modalTypes";

type ModuleTypesProps = {
  courseName: string;
  moduleData: lessonsType[];
  editData: { moduleId: string; title: string };
  errors: {
    moduleError: string;
  };
  loading: {
    modulesLoading: boolean;
  };
  reqStatus: {
    moduleStatus: boolean;
  };
};

const initialState: ModuleTypesProps = {
  courseName: "",
  moduleData: [],
  editData: { moduleId: "", title: "" },
  errors: {
    moduleError: "",
  },
  loading: {
    modulesLoading: false,
  },
  reqStatus: {
    moduleStatus: false,
  },
};
export const handleEditModule = createAsyncThunk(
  "course/handleEditModule",
  async (values:ModuleTypes, { rejectWithValue }) => {
    console.log(values);
    const data = {
      name: values.title,
      course_id: values.course_id,
    };

    console.log(data);
    axios_common.defaults.headers["Content-Type"] = "multipart/form-data";
    return await axios_common
      .post(`Modules/${values.moduleId}`, { ...data, _method: "PUT" })
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const handleGetModules = createAsyncThunk(
  "module/handleGetModules",
  async (coureseId: number, { rejectWithValue }) => {
    return await axios_common
      .get(`Courses/${coureseId}`)
      .then(({ data }) => {
        console.log(data.data);
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);
export const handleCreateModule = createAsyncThunk(
  "module/handleCreateModule",
  async (module: object, { rejectWithValue }) => {
    return await axios_common
      .post("Modules", module)
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);
export const handleDeleteModule = createAsyncThunk(
  "module/handleDeleteModule",
  async (id: string, { rejectWithValue }) => {
    return await axios_common
      .post(`Modules/${id}`,{_method: 'delete'})
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setEditModuleData: (state, action) => {
      console.log(action.payload);
      state.editData = {
        moduleId: action.payload.moduleId,
        title: action.payload.title,
      };
    },
    clearEditModuleData: (state) => {
      console.log("clear");
      state.editData = {
        moduleId: "",
        title: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetModules.pending, (state) => {
        state.loading.modulesLoading = true;
        state.reqStatus.moduleStatus = true;
      })
      .addCase(handleGetModules.fulfilled, (state, action) => {
        state.moduleData = action.payload.modules;
        state.courseName = action.payload.name;
        state.loading.modulesLoading = false;
      })
      .addCase(handleGetModules.rejected, (state) => {
        state.reqStatus.moduleStatus = false;
        state.loading.modulesLoading = false;
      })
      .addCase(handleCreateModule.pending, (state) => {
        state.loading.modulesLoading = true;
        state.reqStatus.moduleStatus = true;
      })
      .addCase(handleCreateModule.fulfilled, (state, action) => {
        state.moduleData.push(action.payload);
        state.loading.modulesLoading = false;
      })
      .addCase(handleCreateModule.rejected, (state) => {
        state.reqStatus.moduleStatus = false;
        state.loading.modulesLoading = false;
      })
      .addCase(handleEditModule.pending, (state) => {
        state.loading.modulesLoading = true;
        state.reqStatus.moduleStatus = true;
      })
      .addCase(handleEditModule.fulfilled, (state) => {
        moduleSlice.actions.clearEditModuleData();
        state.loading.modulesLoading = false;
      })
      .addCase(handleEditModule.rejected, (state) => {
        moduleSlice.actions.clearEditModuleData();
        state.reqStatus.moduleStatus = false;
        state.loading.modulesLoading = false;
      })
      .addCase(handleDeleteModule.pending, (state) => {
        state.loading.modulesLoading = true;
        state.reqStatus.moduleStatus = true;
      })
      .addCase(handleDeleteModule.fulfilled, (state,action) => {
        console.log(action);
        state.loading.modulesLoading = false;
      })
      .addCase(handleDeleteModule.rejected, (state) => {
        state.reqStatus.moduleStatus = false;
        state.loading.modulesLoading = false;
      });
  },
});

export const courseName = (state: RootState) => state.module.courseName;
export const moduleData = (state: RootState) => state.module.moduleData;
export const loading = (state: RootState) => state.module.loading;
export const ModuleEditData = (state: RootState) => state.module.editData;
export const { setEditModuleData, clearEditModuleData } = moduleSlice.actions;

export default moduleSlice.reducer;

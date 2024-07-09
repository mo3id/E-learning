import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Store/Store";
import axios_common from "../../../Services/api";
import toast from "react-hot-toast";

// Define a type for the slice state
interface DrawerState {
  openDrawer: boolean;
  classes: string[];
  grades: string[];
  queryClassN: string;
  queryGradeN: string;
  students: [];
  errorMsg: any;
  id?: string ;
}
interface filters {
  queryGrade: string;
  queryClass: string;
  id?: string | [];
  searchName?: string | null;
}

// Define the initial state using that type
const initialState: DrawerState = {
  openDrawer: false,
  classes: [],
  grades: [],
  queryClassN: "",
  queryGradeN: "",
  students: [],
  errorMsg: "Student not found",
  id:''
};
export const handleFilter = createAsyncThunk(
  "drawer/handleFilter ",
  async (filters: filters, { rejectWithValue }) => {
    console.log("filters", filters);
    filters = { ...filters };
    if (filters.searchName) {
      return await axios_common
        .get(
          `/Students/search?${filters.queryGrade}${filters.queryClass}&name=${filters.searchName}&course_ignore=${filters.id}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => rejectWithValue(err.response.data.message));
    } else {
      console.log(filters.queryGrade);

      return await axios_common
        .get(
          `/Students/search?${filters.queryGrade}${filters.queryClass}&course_ignore=${filters.id}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => rejectWithValue(err.response.data.message));
    }
  }
);

export const handleFilterAll = createAsyncThunk(
  "drawer/handleFilterAll ",
  async (filters: filters, { rejectWithValue }) => {
    console.log("filters", filters);
    filters = { ...filters };

    if (filters.searchName) {
      console.log(
        `/Students/search?${filters.queryGrade}${filters.queryClass}&name=${filters.searchName}&${filters.id}`
      );
      return await axios_common
        .get(
          `/Students/search?${filters.queryGrade}${filters.queryClass}&name=${filters.searchName}&${filters.id}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => rejectWithValue(err.response.data.message));
    } else {
      console.log(
        `/Students/search?${filters.queryGrade}${filters.queryClass}${filters.id}`
      );

      return await axios_common
        .get(
          `/Students/search?${filters.queryGrade}${filters.queryClass}${filters.id}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => rejectWithValue(err.response.data.message));
    }
  }
);
export const handleAsign = createAsyncThunk(
  "drawer/handleAsign",
  async (values: any, { rejectWithValue }) => {
    return await axios_common
      .post(`/StudentsCourses`, values)
      .then((res) => {
        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);
export const getStudentData = createAsyncThunk(
  "drawer/getStudentData",
  async (id: string, { rejectWithValue }) => {
    return await axios_common
      .get(`/Students/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);
export const handleRemove = createAsyncThunk(
  "drawer/handleRemove",
  async (values: any, { rejectWithValue }) => {
    console.log(values);

    return await axios_common
      .post(`/StudentsCourses/removeStudentsFromCourse`, {
        ...values,
        _method: "delete",
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);
export const drawerSlice = createSlice({
  name: "drawer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openDra: (state) => {
      console.log(state);

      state.openDrawer = true;
    },
    filterationArray: (state, action) => {
      console.log("action", action.payload);
      state.queryClassN = action.payload.queryClass;
      state.queryGradeN = action.payload.queryGrade;
      state.id = action.payload.id;
    },
    clearDataStudents: (state, action) => {
      state.students = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFilter.fulfilled, (state, action) => {
        state.students = action.payload.data;
      })
      .addCase(handleFilter.pending, (state, action) => {
        console.log("pending");
        console.log("state",state);
        console.log("action",action);
      })
      .addCase(handleFilter.rejected, (state, action) => {
        console.log("rejected");
        console.log("state",state);
        console.log("action",action);
      })
      .addCase(handleAsign.fulfilled, (state, action) => {
        console.log("fulfilled");
        console.log("state", state);
        console.log("action", action.payload);
        toast.success(action.payload.message);
      })
      .addCase(handleAsign.pending, (state, action) => {
        console.log("pending");
        console.log("state", state);
        console.log("action", action);
      })
      .addCase(handleAsign.rejected, (state, action) => {
        console.log("rejected");
        console.log("state", state);
        console.log("action", action);
      })
      .addCase(handleRemove.fulfilled, (state, action) => {
        console.log("fulfilled");
        console.log("state", state);
        console.log("action", action.payload);
        toast.success(action.payload.message);
      })
      .addCase(handleRemove.pending, (state, action) => {
        console.log("pending");
        console.log("state", state);
        console.log("action", action);
      })
      .addCase(handleRemove.rejected, (state, action) => {
        console.log("rejected");
        console.log("state", state);
        console.log("action", action);
      })
      .addCase(handleFilterAll.fulfilled, (state, action) => {
        // state.students=action.payload.data
        // console.log("fulfilled");
        // console.log("state",state);
        const newData = action.payload.data;
        console.log("action", newData);

        console.log("action", Array.isArray(newData[0]));
        if (Array.isArray(newData[0])) {
          console.log("array of arr");
          let gold: any = [];
          for (let i = 0; i < newData.length; i++) {
            gold = [...gold, ...newData[i]];
          }

          const obj: any = {};

          for (let i = 0, len = gold.length; i < len; i++) {
            obj[gold[i]["id"]] = gold[i];
          }

          gold = [];
          for (const key in obj) {
            gold.push(obj[key]);
          }
          console.log(gold);
          if (gold.length === 0) {
            state.students = [];
            state.errorMsg = "Student not found";
          }
          else{
            state.students = gold;
          }
        } else {
          state.students = newData;
        }
        // if (typeof newData[0][0] === "undefined" ) {
        //   console.log("typeof newData[0][0]",typeof newData[0][0]);

        // if(newData[0].length ==0){
        //   state.students=[]
        //   state.errorMsg = 'Student not found';

        // }

        //  else {
        //   console.log('undefind but objects');

        //   state.students = newData;
        //  }
        // }

        // else  {
        //   console.log('array of arr');
        //   let gold: any = [];
        //   for (let i = 0; i < newData.length; i++) {
        //     gold = [...gold, ...newData[i]];
        //   }

        //   const obj: any = {};

        //   for (let i = 0, len = gold.length; i < len; i++) {
        //     obj[gold[i]["id"]] = gold[i];
        //   }

        //   gold = [];
        //   for (const key in obj) {
        //     gold.push(obj[key]);
        //   }
        //   console.log(gold);

        //   state.students = gold;
        // }
      })
      .addCase(handleFilterAll.pending, (state, action) => {
        // console.log("pending");
        // console.log("state",state);
        console.log("action", action);
      })
      .addCase(handleFilterAll.rejected, (state, action) => {
        // console.log("rejected");
        state.students = [];
        // console.log("state",state);
        state.errorMsg = action.payload;
        console.log("action", action.payload);
      })
      .addCase(getStudentData.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(getStudentData.rejected, (state, action) => {
        console.log(state, action);
      })
      .addCase(getStudentData.fulfilled, (state, action) => {
        console.log(state,action);
      })
  },
});

export const { openDra, filterationArray, clearDataStudents } =
  drawerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const drawerState = (state: RootState) => state.drawer.openDrawer;
export const studentData = (state: RootState) => state.drawer.students;
export const studentQueryGrade = (state: RootState) => state.drawer.queryGradeN;
export const studentQueryClass = (state: RootState) => state.drawer.queryClassN;
export const studentQueryId = (state: RootState) => state.drawer.id;
export const studentError = (state: RootState) => state.drawer.errorMsg;

export default drawerSlice.reducer;

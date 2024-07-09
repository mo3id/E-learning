import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../Slices/CounterSlice";
import { userSlice } from "../Slices/UserSlice";
import { homePageSlice } from "../Slices/HomePageSlice";
import { stateSlice } from "../Slices/StateSlice";
import { coursesSlice } from "../Slices/CourseSlice";

import { moduleSlice } from "../Slices/AddLessonSlices/ModuleSlice";
import { lessonSlice } from "../Slices/AddLessonSlices/LessonSlice";
import { resourcesSlice } from "../Slices/ResourcesModalSlice";
import { drawerSlice } from "../Slices/AddStudentSlices/OpenDrawer";
import modal from "../Slices/ModalSlice"
import { studentSlice } from "../Slices/studentSlice";
// ...

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    mode: stateSlice.reducer,
    user: userSlice.reducer,
    homePage: homePageSlice.reducer,
    course: coursesSlice.reducer,
    module: moduleSlice.reducer,
    lesson: lessonSlice.reducer,
    resourcesModal : resourcesSlice.reducer,
    drawer:drawerSlice.reducer,
    modal,
    student: studentSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

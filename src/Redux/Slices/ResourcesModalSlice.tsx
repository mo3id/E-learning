import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store/Store";

interface ResourcesSliceData {
  type: string;
  title: string;
  resource: string;
  isModalOpen: boolean;
}

const initialState: ResourcesSliceData = {
  type: "",
  title: "",
  resource: "",
  isModalOpen: false,
};


export const resourcesSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    showResourcesModalReducer: (state, action) => {
      console.log(action.payload);
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.resource = action.payload.resource;
      state.isModalOpen = true;
      console.log(state.title);
    },
    hideResourcesModalReduser: (state) => {
      state.type = "";
      state.title = "";
      state.resource = "";
      state.isModalOpen = false;
    },
  },
});

export const isResourcesModalOpen = (state: RootState) => state.resourcesModal.isModalOpen;
export const resourcesModalTitle = (state: RootState) => state.resourcesModal.title;
export const resourcesModalType = (state: RootState) => state.resourcesModal.type;
export const resourcesModalResource = (state: RootState) =>
  state.resourcesModal.resource;
export const { showResourcesModalReducer } = resourcesSlice.actions;
export const { hideResourcesModalReduser } = resourcesSlice.actions;
export default resourcesSlice.reducer;

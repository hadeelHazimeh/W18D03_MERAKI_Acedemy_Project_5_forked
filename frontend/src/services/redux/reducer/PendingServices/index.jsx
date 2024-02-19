import { createSlice } from "@reduxjs/toolkit";
export const pendingServicesSlice = createSlice({
  name: "pendingServices",
  initialState: {
    pendingServices: [],
  },
  reducers: {
    setPendingServices(state, action) {
      state.pendingServices = action.payload;
    },
    addPendingServices(state, action) {

    },
  },
});
export const { setPendingServices } = pendingServicesSlice.actions;

export default pendingServicesSlice.reducer;

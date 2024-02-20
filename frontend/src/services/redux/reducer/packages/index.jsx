import { createSlice } from "@reduxjs/toolkit";
export const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packages:[],
  },
  reducers: {
    setPackages(state, action) {
      state.packages = action.payload;

    },
  },
});
export const { setPackages } = packagesSlice.actions;

export default packagesSlice.reducer;

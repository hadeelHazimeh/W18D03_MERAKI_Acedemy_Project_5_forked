import { createSlice } from "@reduxjs/toolkit";
export const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packages:[],
    packagesName:[]
  },
  reducers: {
    setPackages(state, action) {
      state.packages = action.payload;

    },
    setPackagesName(state, action) {
      state.packagesName=action.payload

    },
  },
});
export const { setPackages,setPackagesName } = packagesSlice.actions;

export default packagesSlice.reducer;

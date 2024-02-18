import { createSlice } from "@reduxjs/toolkit";
export const serviceProviderSlice = createSlice({
  name: "serviceProvider",
  initialState: {
    services: [],
  },
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
  },
});
export  const { setServices } = serviceProviderSlice.actions;
export default  serviceProviderSlice.reducer;
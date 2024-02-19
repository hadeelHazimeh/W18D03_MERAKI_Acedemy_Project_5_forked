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
    addService(state, action) {
      state.services = [...state.services, action.payload];
    },
  },
});
export const { setServices, addService } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;

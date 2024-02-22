import { createSlice } from "@reduxjs/toolkit";
export const pendingServicesSlice = createSlice({
  name: "pendingServices",
  initialState: {
    pendingServices:[],
  },
  reducers: {
    setPendingServices(state, action) {
      state.pendingServices = action.payload;
   // console.log(state.pendingServices);
    },
    updateServiceStatusById: (state, action) => {
      state.pendingServices=state.pendingServices.filter(service=>{
        return service.service_id!==action.payload
      })
   },
  },
});
export const { setPendingServices ,updateServiceStatusById} = pendingServicesSlice.actions;

export default pendingServicesSlice.reducer;

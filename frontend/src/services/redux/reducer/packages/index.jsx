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
      state.packagesName=state.packages.map((pac,i)=>{
//console.log('w', pac.package_name)
        return pac.package_name
      })
state.packagesName=state.packagesName.filter((item,
  index) => state.packagesName.indexOf(item) === index);
  console.log('state', state.packagesName)

    },
  },
});
export const { setPackages,setPackagesName } = packagesSlice.actions;

export default packagesSlice.reducer;

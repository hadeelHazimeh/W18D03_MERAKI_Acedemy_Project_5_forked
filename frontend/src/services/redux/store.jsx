import { configureStore } from "@reduxjs/toolkit";
// import the reducer
import index from "./reducer/auth/index";
import serviceProviderReducer  from "./reducer/serviceProvider"
import pendingServicesReducer from "./reducer/PendingServices/index";
import packagesReducer from "./reducer/packages/index";
export default configureStore({
  // the reducer object is empty for now but after creating reducers we add them to this object
  reducer: {
    auth:index,
    serviceProvider: serviceProviderReducer,  
    pendingServices: pendingServicesReducer,
    packages:packagesReducer
  },
});
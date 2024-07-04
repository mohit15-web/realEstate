import { configureStore } from "@reduxjs/toolkit";
import { propertySlice } from "./slices";


let store = configureStore({
    reducer:{
        property: propertySlice.reducer
    }
})

export default store
import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./paginationSlice";

const store = configureStore({
    reducer : {
        pagination : paginationSlice.reducer
    }
})

export default store;
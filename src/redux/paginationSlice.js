import {createSlice} from "@reduxjs/toolkit"

// create page takes an object
const paginationSlice = createSlice({
    name : "pagination",
    initialState : {pageNo: 1},
    reducers : {
        handleNext : (state) => {
            state.pageNo += 1;
        },
        handlePrev : (state) => {
            if(state.pageNo == 1)
                return;
            state.pageNo -= 1;
        }
    }
});

export default paginationSlice;
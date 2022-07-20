import { createSlice } from "@reduxjs/toolkit";

export const searchInputSlice = createSlice({
  name: "inputReset",
  initialState: {
    inputVal: "",
    searchShow: false,
  },
  reducers: {
    setInputVal: (state, action) => {
      state.inputVal = action.payload;
    },
    setSearchShow: (state, action) => {
      state.searchShow = action.payload;
    },
  },
});

export const { setInputVal, setSearchShow } = searchInputSlice.actions;
export default searchInputSlice.reducer;

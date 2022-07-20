import { configureStore } from "@reduxjs/toolkit";
import searchInputSlice from "../features/searchInputSlice";

export default configureStore({
  reducer: {
    inputReset: searchInputSlice,
  },
});

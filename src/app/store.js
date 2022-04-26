import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import alramDataReducer from "../features/alramDataSlice";

export const store = configureStore({
  reducer: {
    alramData: alramDataReducer,
  },

  middleware: [logger],
});

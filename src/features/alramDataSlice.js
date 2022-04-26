import { createSlice } from "@reduxjs/toolkit";

const alramData = require("../data/alramData.json");

const alramDataReducer = createSlice({
  name: "alramData",
  initialState: alramData,
  reducers: {
    "alramAdd": (state, action) => {
      const id  = action.payload.id;

      state.allIds = state.allIds.concat(id).sort();
      state.byIds[id] = action.payload;
    },

    "alramOff": (state, action) => {
      const id = action.payload;

      state.byIds[id].alramOn = "off";
    },

    "alramDelete": (state, action) => {
      const id = action.payload;
      const newState = Object.assign({}, state);

      delete newState.byIds[id];

      state.allIds = state.allIds.filter((alramId) => alramId !== id);
      state.byIds = newState.byIds;
    },
  }
});

export const { alramAdd, alramOff, alramDelete } = alramDataReducer.actions;
export default alramDataReducer.reducer;

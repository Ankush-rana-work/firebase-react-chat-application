import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null
    },
    updateRefeshTokenAndToken: (state, action) => {
      let tokenInfo = action.payload;
      state.user = { ...state.user, ...tokenInfo }
    },
    updateChangeProfileInfo: (state, action) => {
      let profileInfo= action.payload;
      state.user = { ...state.user, ...profileInfo }
    },
  },
});

// this is for dispatch
export const { login, logout, updateRefeshTokenAndToken, updateChangeProfileInfo } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    userInfo: {},
  },
  reducers: {
    signIn: (state, { payload }) => {
      state.isLogged = true;
      state.userInfo = payload.user;

      localStorage.setItem("CHANNA_TOKEN", payload.token);
    },
    signOut: (state) => {
      state.isLogged = false;
      state.userInfo = {};
      localStorage.removeItem("CHANNA_TOKEN");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;

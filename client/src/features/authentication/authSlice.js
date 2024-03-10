import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload.user, isAuthenticated: true };
    },
    removeUser: (state) => {
      return { ...state, user: null, isAuthenticated: false };
    },
  },
});

export default authSlice.reducer;
export const { setUser, removeUser } = authSlice.actions;

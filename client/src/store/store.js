import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../features/authentication/authAPI";
import userReducer from "../features/authentication/authSlice";
import { converseApi } from "../features/Conversation/converseApi";
import { chatApi } from "../features/Chat/chatApi";
import converseReducer from "../features/Conversation/converseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: converseReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [converseApi.reducerPath]: converseApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat([
      authAPI.middleware,
      converseApi.middleware,
      chatApi.middleware,
    ]),
});

export default store;

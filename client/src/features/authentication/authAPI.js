import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "authAPI",
  tagTypes: ["SignIn", "SignUp"],
  endpoints: (build) => ({
    signinUser: build.mutation({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),

    signupUser: build.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSigninUserMutation, useSignupUserMutation } = authAPI;
export { authAPI };

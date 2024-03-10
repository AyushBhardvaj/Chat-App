import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const converseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "converseAPI",
  tagTypes: [],
  endpoints: (build) => ({
    conversationList: build.query({
      query: (userId) => ({
        url: `/conversations/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    usersList: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
        credentials: "include",
      }),
    }),
    newConversation: build.query({
      query: (userId) => ({
        url: `/conversation/new/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useConversationListQuery, useUsersListQuery, useNewConversationQuery } = converseApi;
export { converseApi };

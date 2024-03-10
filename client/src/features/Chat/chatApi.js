import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "chatApi",

  endpoints: (build) => ({
    getMesssages: build.query({
      query: ({ receiverId, conversationId }) => ({
        url: "messages",
        method: "GET",
        params: { receiverId, conversationId },
        credentials: "include",
      }),
    }),

    sendMessage: build.mutation({
      query: (body) => ({
        url: "/message",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
  }),
});

export const { useGetMesssagesQuery, useSendMessageMutation } = chatApi;
export { chatApi };

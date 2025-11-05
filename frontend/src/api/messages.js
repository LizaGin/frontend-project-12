import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState();

      headers.set('Authorization', `Bearer ${auth.token}`);

      return headers;
    },
  }),
  tagTypes: ['messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['messages'],
    }),
    sentMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSentMessageMutation } = messagesApi;

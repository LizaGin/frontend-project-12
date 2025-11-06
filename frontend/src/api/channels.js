import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState()

      headers.set('Authorization', `Bearer ${auth.token}`)

      return headers
    },
  }),
  tagTypes: ['channels', 'messages'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['channels'],
    }),
    addChannel: builder.mutation({
      query: channel => ({
        method: 'POST',
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: channel => ({
        url: channel.id,
        method: 'PATCH',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: ['messages', 'channels'],
      }),
    }),
  }),
})

export const { useGetChannelsQuery, useAddChannelMutation, useUpdateChannelMutation, useRemoveChannelMutation } = channelsApi

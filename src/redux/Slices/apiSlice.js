import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://alibackend.duckdns.org' }),
  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,
    }),
     sendMessage: build.mutation({
      query: (data) => ({
        url: 'chat/create_chat/',
        method: 'POST',
        body: data,
      }),
    }),
     addMessageToChat: build.mutation({
      query: (data) => ({
        url: 'chat/add_message_to_chat/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useSendMessageMutation,useAddMessageToChatMutation } = apiSlice
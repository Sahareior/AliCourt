import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://alibackend.duckdns.org',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,
    }),
      signup: build.mutation({
      query: (loginData) => ({
        url: '/authentication_app/signup/',
        method: 'POST',
        body: loginData,
      }),
    }),

signin: build.mutation({
  query: (loginData) => ({
    url: '/authentication_app/signin/',
    method: 'POST',
    body: loginData,
  }),
}),
    logout: build.mutation({
      query: () => ({
        url: '/authentication_app/logout/',
        method: 'POST',
      }),
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
     getMessages: build.query({
      query: () => 'chat/get_users_chat_list/',
    }),

    getChatById: build.query({
      query: (id) => `chat/get_a_chat_content/${id}/`,
    }),


  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useSendMessageMutation,
  useAddMessageToChatMutation,useSignupMutation,
  useGetMessagesQuery,useGetChatByIdQuery, useSigninMutation,useLogoutMutation} = apiSlice
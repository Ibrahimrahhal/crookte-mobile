import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type LoginPayload = {
  phone_number: string;
  password: string;
};

type RegisterPayload = {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id: string;
  password: string;
};

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "login",
        method: "POST",
        body: payload,
      }),
    }),

    register: builder.mutation<LoginResponse, RegisterPayload>({
      query: (payload) => ({
        url: "register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;

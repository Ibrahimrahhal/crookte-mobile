import { createApi } from "@reduxjs/toolkit/query/react";
import BaseQuery from "home/store/apis/base";
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
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    register: builder.mutation<LoginResponse, RegisterPayload>({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;

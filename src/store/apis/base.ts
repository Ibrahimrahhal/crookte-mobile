import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Authorization: "Bearer " + process.env.EXPO_PUBLIC_API_KEY,
  },
});

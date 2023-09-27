import { createApi } from "@reduxjs/toolkit/query/react";
import BaseQuery from "home/store/apis/base";

type RequestPoliceUnitPayload = {
  ambulance_needed: "true" | "false";
  fire_track_needed: "true" | "false";
  latitude: string;
  longitude: string;
};

export const requestPoliceUnitAPI = createApi({
  reducerPath: "policeUnitAPI",
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    requestPoliceUnit: builder.mutation<void, RequestPoliceUnitPayload>({
      query: (payload) => ({
        url: "police-unit-request/request",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useRequestPoliceUnitMutation } = requestPoliceUnitAPI;

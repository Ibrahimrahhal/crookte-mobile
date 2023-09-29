import { createApi } from "@reduxjs/toolkit/query/react";
import BaseQuery from "home/store/apis/base";

type NewReportPayLoad = {
  token: string;
  location: string;
  latitude: string;
  longitude: string;
  points: string;
  report_sides: {
    phone_number: string;
    pic_of_id: string[];
    pic_of_car_id: string[];
    side_note: string;
    is_side_wrong: "true" | "false";
    car_images: string[];
  }[];
};

export const reportsAPI = createApi({
  reducerPath: "reportsAPI",
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    createNewReport: builder.mutation<void, NewReportPayLoad>({
      query: ({ token, ...payload }) => {
        const headers = {
          Authorization: "Bearer " + token,
        };

        return {
          url: "report",
          method: "POST",
          body: payload,
          headers,
        };
      },
    }),
  }),
});

export const { useCreateNewReportMutation } = reportsAPI;

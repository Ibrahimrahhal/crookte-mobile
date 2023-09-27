import { authAPI } from "home/store/apis/auth";
import { requestPoliceUnitAPI } from "home/store/apis/request-police-unit";

const APIs = [authAPI, requestPoliceUnitAPI];

export const Middlewares = APIs.map((api) => api.middleware);
export const Reducers = APIs.reduce(
  (
    acc: {
      [x: string]: any;
    },
    api,
  ) => {
    acc[api.reducerPath] = api.reducer;
    return acc;
  },
  {},
);

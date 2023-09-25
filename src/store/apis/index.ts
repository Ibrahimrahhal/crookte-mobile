import { authAPI } from "home/store/apis/auth";

const APIs = [authAPI];

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

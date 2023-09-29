import { configureStore } from "@reduxjs/toolkit";
import Reducers from "home/store/slices";
import {
  Middlewares as APIMiddlewares,
  Reducers as APIReducers,
} from "home/store/apis";

export const store = configureStore({
  reducer: {
    ...Reducers,
    ...APIReducers,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(...APIMiddlewares) as any;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

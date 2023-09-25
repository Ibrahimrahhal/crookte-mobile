import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import StorageUtil from "home/utils/storage";
import TokenUtil from "home/utils/token";

export interface AuthState {
  isLoggedIn: boolean;
  isAuthReady: boolean;
  isUserFirstTime: boolean;
  AccessToken?: string;
  RefreshToken?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAuthReady: false,
  isUserFirstTime: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.AccessToken = action.payload.accessToken;
      state.RefreshToken = action.payload.refreshToken;
      TokenUtil.saveToken(action.payload.accessToken);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.AccessToken = undefined;
      state.RefreshToken = undefined;
      TokenUtil.saveToken("");
    },
    ready: (state) => {
      state.isAuthReady = true;
    },
    firstTime: (state) => {
      state.isUserFirstTime = false;
    },
    passedTour: (state) => {
      state.isUserFirstTime = false;
      StorageUtil.set("isUserFirstTime", "false");
    },
  },
});

export const { login, logout, ready, firstTime } = authSlice.actions;

export default authSlice.reducer;

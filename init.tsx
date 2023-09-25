import { store } from "home/store";
import { firstTime, login, ready } from "home/store/slices/auth";
import StorageUtil from "home/utils/storage";
import TokenUtil from "home/utils/token";

// @todo: find a better way to do this
Promise.all([TokenUtil.getToken(), StorageUtil.get("isUserFirstTime")]).then(
  ([token, userFirstTime]) => {
    if (token) {
      store.dispatch(login({ accessToken: token, refreshToken: "" }));
    }
    if (userFirstTime) {
      store.dispatch(firstTime());
    }
    store.dispatch(ready());
  },
);

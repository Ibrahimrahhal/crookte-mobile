import { useSelector } from "react-redux";

export default function ProtectedHOC(Component: any) {
  return function ProtectedComponent(props: any) {
    const { navigation } = props;
    const isUserLoggedIn = useSelector((state: any) => state.auth?.isLoggedIn);
    if (isUserLoggedIn) {
      return <Component {...props} />;
    } else {
      navigation.navigate("Authentication");
      return null;
    }
  };
}

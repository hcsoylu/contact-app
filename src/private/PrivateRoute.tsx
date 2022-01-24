import { Navigate } from "react-router-dom";
import { User } from "../model/model";

type PrivateRouteProps = {
  children: JSX.Element;
  userData: User | null;
};

const PrivateRoute = ({ children, userData }: PrivateRouteProps) => {
  return userData ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

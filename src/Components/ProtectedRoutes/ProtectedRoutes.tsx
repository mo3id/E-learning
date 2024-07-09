import { Navigate, Outlet } from "react-router-dom";
import { userMode } from "../../Redux/Slices/StateSlice";
import { useAppSelector } from "../../Hooks/ReduxHook";

// interface Props {
//   children: React.ReactNode;
// }

// export default function ProtectedLayer(props:Props) {
export default function ProtectedRoutes() {
  const role = useAppSelector(userMode);
  {
    role ? role : localStorage.getItem("role");
  }
  if (role) {
    return <Outlet />;
  } else {
    return <Navigate to="/counter" />;
  }
}

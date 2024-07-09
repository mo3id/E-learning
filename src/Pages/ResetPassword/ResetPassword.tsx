import ChangePassword from "../../Components/ResetPassword/ChangePassword";

import { Toaster } from "react-hot-toast";
function ResetPassword() {
  return (
    <div className={`w-100 d-flex justify-content-center vh-100`}>
      <ChangePassword />
      <Toaster></Toaster>
    </div>
  );
}

export default ResetPassword;

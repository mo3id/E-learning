

import ModelVerfication from "../../Components/ModelVerfication/ModelVerfication";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function VerifyEmail() {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/auth/reset-password");
  };
  return (
    <>
      <ModelVerfication redirectPath={redirect} />
      <Toaster></Toaster>
    </>
  );
}

export default VerifyEmail;

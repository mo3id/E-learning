import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  socialUser,
  fetchSocialUserData,
  Loading,
  handleProfile,
  Confirmed,
} from "../../../Redux/Slices/UserSlice";
import {Result} from "antd";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import "./Resultbutton.css";



const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const code = searchParams.get("code");
  const { socialMediaConfirmed } = useAppSelector(Confirmed);

  const [user] = useState<socialUser>({
    username: username || "",
    code: code || "",
  });

  const { loadingSocialMedia } = useAppSelector(Loading);
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      dispatch(fetchSocialUserData(user));
    }
     if (socialMediaConfirmed) {
      dispatch(handleProfile());
      navigate("/dashboard/userProfile");
    }
  }, [dispatch, isFirst, user, socialMediaConfirmed, navigate]);


  return (
    <>
        <div className="spinerContainer">
      {loadingSocialMedia ? (
         <span></span>
      ) : (
        <Result
          className="Resultbutton"
          status="success"
          title="Login Successfully"
     
        />
      )}
          </div>
    </>
  );
};

export default Success;

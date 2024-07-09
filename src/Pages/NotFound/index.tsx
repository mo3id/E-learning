import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/ReduxHook";
import { clearErrors } from "../../Redux/Slices/UserSlice";

function NotFound() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  function redirectHome(): void {
    dispatch(clearErrors())
    navigate("/register");
  }
  return (
    <>
      <div className="notFoundContainer">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <button className={`notFound`} onClick={() => redirectHome()}>
              Back Home
            </button>
          }
        />
      </div>
    </>
  );
}

export default NotFound;

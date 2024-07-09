import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./Resultbutton.css";

const Failed: React.FC = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/auth/login");
  };
  return (
    <>
       <div className="spinerContainer">
        <Result
          className="Resultbutton"
          status="error"
          title="Login Failed"
          extra={[
            <Button
              className="BtnColor"
              type="primary"
              key="console"
              onClick={goToProfile}
            >
              Try Agian
            </Button>,
          ]}
        />
      </div>
    </>
  );
};

export default Failed;

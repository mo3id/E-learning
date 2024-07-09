import { useLayoutEffect } from "react";
import { Alert, Space } from "antd";
import { useEffect, useState } from "react";
import styles from "./ModelVerfication.module.css";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import {
  UserEmail,
  verify,
  resend,
  Errors,
  clearErrors,
} from "../../Redux/Slices/UserSlice";
import { useFormik } from "formik";
import { verficationModel } from "../../Services/Interfaces/otpInterface";

import toast from "react-hot-toast";

import { DataEmail } from "../../Services/Interfaces/email";
import { MyFormValues } from "../../Services/Interfaces/userInterFace";
interface path {
  redirectPath: () => void;
}

export default function ModelVerfication({ redirectPath }: path) {
  const [email, setEamil] = useState("");
  const eamilFromSlice = useAppSelector(UserEmail);
  const { loginError } = useAppSelector(Errors);

  //new
  const [timeEnd, setTimeEnd] = useState(0);
  const [showTime, setShowTime] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimeOut, setIsTimeOut] = useState("pending");

  //ADD WHEN FULL FILLED

  async function resendBtn() {
    const dataEmail: DataEmail = {
      email,
    };
    formik.resetForm;
    const { payload } = await dispatch(resend(dataEmail));
    if (payload?.success) {
      toast.success(payload?.message);

      setIsTimeOut("verify");
    } else {
      toast.error(payload?.message);
    }
  }
  //END FULLfILLED

  useLayoutEffect(() => {
    const endTime = JSON.parse(
      localStorage.getItem("verficationCodeTime") || ""
    );
    setTimeEnd(endTime);
    const timer = setInterval(() => {
      setRemainingTime(timeEnd - Date.now());
    }, 1000);
    setShowTime(true);
    return () => {
      clearInterval(timer);
    };
  }, [timeEnd, isTimeOut]);
  useEffect(() => {
    if (remainingTime < 0) {
      setIsTimeOut("resend");
      setShowTime(false);
    } else if (remainingTime > 0) {
      setIsTimeOut("verify");
      setShowTime(true);
    }
  }, [remainingTime]);

  const formatTime = (time: number): string => {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 1000 / 60) % 60;

    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  //end of new
  //variables
  type InitialValuesType = {
    digit1: string;
    digit2: string;
    digit3: string;
    digit4: string;
    digit5: string;
    digit6: string;
  };

  const initialValues: InitialValuesType & MyFormValues = {
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  };
  const dispatch = useAppDispatch();

  // let SubmitedData:verficationModel={
  // email: '',
  // otp:''
  // }

  //functions
  const digitValidate = function (ele: string) {
    ele.replace(/[^0-9]/g, "");
  };

  const tabChange = function (val: number) {
    const ele = document.querySelectorAll("input");
    if (ele[val - 1].value != "") {
      if (val == 6) return;
      ele[val].focus();
    } else if (ele[val - 1].value == "") {
      if (val == 1) return;
      ele[val - 2].focus();
    }
  };
  async function handleSubmit(values: MyFormValues) {
    Object.values(values).join("");

    const SubmitedData: verficationModel = {
      email,
      otp: Object.values(values).join(""),
    };

    const { payload } = await dispatch(verify(SubmitedData));

    if (payload.success == true) {
      redirectPath();
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });
  const errorFire = () => {
    toast.error("Oops, Something wasn't right , Try later again");
  };

  function setEmailEveryRefresh(): void {
    const userEamil = localStorage.getItem("userEmail");
    if (userEamil) {
      setEamil(userEamil);
    } else if (eamilFromSlice) {
      setEamil(eamilFromSlice);
    } else if (!userEamil && !eamilFromSlice) {
      errorFire();
    }
  }
  window.onload = () => {
    setEmailEveryRefresh();
  };
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);
  useEffect(() => {
    setEmailEveryRefresh();
  }, []);
  return (
    <>
      <div
        className={`container ${styles.height100} d-flex justify-content-center align-items-center ${styles.contain}`}
      >
        <div className="position-relative">
          <div className={`${styles.card}  text-center`}>
            <div className={`${styles.circle}`}>
              <i className={`fa-regular fa-envelope fa-2x ${styles.iconS}`}></i>
            </div>
            <h6>
              Please enter the one time code <br /> to verify your account
            </h6>
            <div>
              {" "}
              <span>A code has been sent to</span> <small>{email}</small>{" "}
            </div>
            <form
              className={`mt-5 ${styles.formInputs}   `}
              onSubmit={formik.handleSubmit}
            >
              <div className="d-flex flex-row justify-content-center mt-2">
                <input
                  className={`otp m-2 text-center form-control rounded ${styles.formcontrolS}`}
                  type="text"
                  autoFocus={true}
                  onInput={(e) => digitValidate(e.currentTarget.value)}
                  onKeyUp={() => tabChange(1)}
                  maxLength={1}
                  name="digit1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  className={`otp m-2 text-center form-control rounded ${styles.formcontrolS}`}
                  type="text"
                  onInput={(e) => digitValidate(e.currentTarget.value)}
                  onKeyUp={() => tabChange(2)}
                  maxLength={1}
                  name="digit2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  className={`otp m-2 text-center form-control rounded ${styles.formcontrolS}`}
                  type="text"
                  onInput={(e) => digitValidate(e.currentTarget.value)}
                  onKeyUp={() => tabChange(3)}
                  maxLength={1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="digit3"
                />
                <input
                  className={`otp m-2 text-center form-control rounded ${styles.formcontrolS}`}
                  type="text"
                  onInput={(e) => digitValidate(e.currentTarget.value)}
                  onKeyUp={() => tabChange(4)}
                  maxLength={1}
                  name="digit4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  className={`otp m-2 text-center form-control rounded ${styles.formcontrolS}`}
                  type="text"
                  onInput={(e) => digitValidate(e.currentTarget.value)}
                  onKeyUp={() => tabChange(5)}
                  maxLength={1}
                  name="digit5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  className={`otp m-2 text-center form-control rounded ${styles.formcontrolS}`}
                  type="text"
                  onInput={(e) => digitValidate(e.currentTarget.value)}
                  onKeyUp={() => tabChange(6)}
                  maxLength={1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="digit6"
                />
              </div>
              {loginError && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Alert message={loginError.slice(9)} type="error" />
                </Space>
              )}
              {isTimeOut === "verify" && (
                <button
                  className={`mt-4 mb-4 customBtn ${styles.verfiyBtn}`}
                  type="submit"
                >
                  Verify
                </button>
              )}
              {isTimeOut === "resend" && (
                <button
                  className={`mt-4 mb-4 customBtn ${styles.resendBtn}`}
                  type="reset"
                  onClick={resendBtn}
                >
                  Resend
                </button>
              )}
              {isTimeOut === "pending" && (
                <button
                  className={`mt-4 mb-4 customBtn opacity-50 ${styles.pendingBtn}`}
                >
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              )}
            </form>

            <div></div>

            <div className="text-center mt-3 d-flex justify-content-center">
              Code will expire in : &nbsp;
              {remainingTime > 0 && showTime && (
                <span> {formatTime(remainingTime)}</span>
              )}
              {remainingTime < 0 && <span>Time out!</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

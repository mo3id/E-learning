import React, { useState } from "react";
import { Modal } from "antd";
import styles from "./model.module.css";

import { stateStatus } from "../../Redux/Slices/StateSlice";
import { useAppDispatch } from "../../Hooks/ReduxHook";
import { useNavigate } from "react-router-dom";
interface Props {
  clickString: string;
  classCustom: string;
}
export default function Model(props: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <button className={props.classCustom} onClick={showModal}>
        {props.clickString}
      </button>
      <Modal
        open={open}
        title={<p className={styles.textColor}>Signup as a</p>}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.ParentDivButtons}>
          <button
            className="w-75"
            name="student"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(stateStatus(event.currentTarget.getAttribute("name")));
              navigate("/register");
            }}
          >
            Student
          </button>
          <button
            className="w-75"
            data-attribute="teacher"
            name="teacher"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(stateStatus(event.currentTarget.getAttribute("name")));
              navigate("/register");
            }}
          >
            Teacher
          </button>
        </div>
      </Modal>
    </>
  );
}

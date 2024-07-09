import { useEffect, useState } from "react";
import classes from "./UserProfile.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Avatar, message } from "antd";
import { Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { User, handleEditPhotoProfile } from "../../../Redux/Slices/UserSlice";

import { useDropzone } from "react-dropzone";
import { MyFormValues } from "../../../Services/Interfaces/userInterFace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function EditProfileSide() {
  const { userData } = useAppSelector(User);
  const [imgSrc, setImgSrc] = useState(userData.photo);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch();

  function handleEditPhoto(values: MyFormValues) {
    const formdata = new FormData();
    formdata.append("photo", values.photo!);
    formdata.append("id", values.id!.toString());
    formdata.append("_method", "PUT");
    dispatch(handleEditPhotoProfile(formdata)).then(({ meta, payload }) =>
      meta.requestStatus === "fulfilled"
        ? messageApi.success(payload)
        : messageApi.error(payload)
    );
  }

  const handleDrop = (acceptedFiles: Blob[]) => {
    setImgSrc(URL.createObjectURL(acceptedFiles[0]));
    handleEditPhoto({
      ...userData,
      photo: acceptedFiles[0],
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  useEffect(() => {
    setImgSrc(userData.photo);
  }, [userData]);

  return (
    <Stack
      className={`${classes.personalInfo} align-items-center justify-content-center `}
    >
      {contextHolder}

      <div className={`${classes.avatarParent}`}>
        <div
          {...getRootProps()}
          className={`drop-zone  ${isDragActive ? "dragging" : ""}`}
        >
          <Avatar
            size={100}
            icon={
              <img src={`${imgSrc}`} alt={userData.first_name?.slice(0, 1)} />
            }
            className=""
          />
          <input name="image" {...getInputProps()} />
          {isDragActive ? (
            // <FontAwesomeIcon className="position-absolute" icon={faCamera} />
            <span className="DRAG-IMAGE-HERE">DRAG IMAGE HERE</span>
          ) : (
            <FontAwesomeIcon className={`${classes.cameraDesign}`} icon={faCamera} />
          )}
        </div>
      </div>
      <h5 className={classes.userName}>{userData.first_name}</h5>
    </Stack>
  );
}

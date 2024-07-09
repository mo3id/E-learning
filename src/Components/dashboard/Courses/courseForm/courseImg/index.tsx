import { SetStateAction, useState } from "react";
import classes from "./UserProfile.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Avatar } from "antd";
import { Stack } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function CourseImage({
  courseImg,
  setCourseImg,
}: {
  courseImg: Blob | string;
  setCourseImg: React.Dispatch<SetStateAction<Blob | string>>;
}) {
  const [imgSrc, setImgSrc] = useState(courseImg);

  const handleDrop = (acceptedFiles: Blob[]) => {
    setImgSrc(URL.createObjectURL(acceptedFiles[0]));
    setCourseImg(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <Stack
      className={`align-items-stretch h-100 w-100 justify-content-center p-3`}
    >
      <div className={`${classes.avatarParent} flex-grow-1`}>
        <div
          {...getRootProps()}
          className={`drop-zone w-100 h-100 ${isDragActive ? "dragging" : ""}`}
        >
          {imgSrc ? (
            <Avatar
              size={200}
              icon={<img src={`${imgSrc}`} alt={"image"} />}
              className="w-100"
              shape="square"
            />
          ) : (
            <div
              className="w-100 h-100 d-flex flex-column justify-content-center align-items-center p-4"
              style={{ background: "#ddd" }}
            >
              <FontAwesomeIcon size="3x" icon={faCloudArrowDown} />
              <h6>Drag image here...</h6>
            </div>
          )}
          <input name="image" {...getInputProps()} />
          {isDragActive ? (
            <span className="DRAG-IMAGE-HERE">DRAG IMAGE HERE</span>
          ) : (
            <FontAwesomeIcon
              className={`${classes.cameraDesign}`}
              icon={faCamera}
            />
          )}
        </div>
      </div>
    </Stack>
  );
}

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload, Alert, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./LessonModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../../../Hooks/ReduxHook";
import {
  clearEditLessonData,
  editData,
  handleAddLesson,
  handleDeleteResource,
  handleEditLesson,
  isEditMode,
} from "../../../../../Redux/Slices/AddLessonSlices/LessonSlice";
import { handleGetModules } from "../../../../../Redux/Slices/AddLessonSlices/ModuleSlice";
import { useParams } from "react-router-dom";
import { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

type ModalCompTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


type lessonDateChanged = {
  title: string;
  hours: { hours: string; minutes: string } | string;
  description: string;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ModalLesson({ open, setOpen }: ModalCompTypes) {
  const params = useParams();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState({ hours: null, minutes: null });
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<RcFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>();

  const lessonDateEdit = useAppSelector(editData);
  const editMode = useAppSelector(isEditMode);

  const [lessonDateChanged, setLessonDateChanged] = useState<lessonDateChanged>(
    {
      title: "",
      hours: { hours: null, minutes: null },
      description: "",
    }
  );
  const [filesChanged, setFilesChanged] = useState<RcFile[]>([]);

  useEffect(() => {
    if (editMode) {
      console.log(lessonDateEdit);
      setTitle(lessonDateEdit.name);

      
      const time = lessonDateEdit.hours;
      const hours = time.slice(0, time.indexOf(":"));
      const minutes = time.slice(time.indexOf(":") + 1);
      setHours({ hours: hours, minutes: minutes });
      setDescription(lessonDateEdit.description);
      setLessonDateChanged({
        title: lessonDateEdit.name,
        hours: { hours: hours, minutes: minutes },
        description: lessonDateEdit.description,
      });
      setFiles(lessonDateEdit.resources);
      const fileListEdit = lessonDateEdit.resources.map((file) => ({
        name: file.path.slice(file.path.lastIndexOf("_") + 1),
        url: file.path,
      }));
      setFileList(fileListEdit);
    }
  }, [lessonDateEdit]);
  useEffect(() => {
    console.log(filesChanged);
  }, [filesChanged]);
  useEffect(() => {
    console.log(files);
  }, [files]);

  const [errors, setErrors] = useState({
    title: "",
    hours: "",
    description: "",
    files: "",
  });

  const validateFile = (file:RcFile) => {
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));
    const allowedExtensions =
      /(\.jpg|\.jpeg|\.png|\.gif|\.gif|\.pdf|\.docx|\.mp4|\.ogg|\.wmv|\.webm|\.mp3|\.xlsx)$/i;

    if (!allowedExtensions.exec(fileExtension)) {
      setErrors((prev) => ({ ...prev, files: "Invalid file type" }));
      return false;
    }
    return true;
  };

  const editFileName = (file:any) => {
    let newFileName = file.name;
    if (newFileName.includes("_")) {
      newFileName = newFileName.replaceAll("_", "-");
    }
    return newFileName;
  };

  const addFiles = (file: RcFile) => {
    const isValidated = validateFile(file);
    console.log(isValidated);
    if (!isValidated) {
      return;
    }
    console.log("object");
    const modifiedFileName = editFileName(file);
    const newFile = new File([file], modifiedFileName, {
      type: file.type,
    });
    if (editMode) {
      setFilesChanged((prev) => [...prev, newFile]);
    } else {
      setFiles((prev) => [...prev, newFile]);
    }
    return false;
  };

  const handleCancel = () => {
    const confirmCancle = confirm(
      "Are you sure you want to cancel, you will lose your changes"
    );
    if (confirmCancle) {
      setOpen(false);
      setTitle("");
      setHours({ hours: null, minutes: null });
      setDescription("");
      setFiles([]);
      setErrors({ title: "", description: "", files: "", hours: "" });
      setFileList([]);
      setFilesChanged([]);
      dispatch(clearEditLessonData());
    }
  };

  const handleCancelModal = () => {
    setPreviewOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));
    const imgEX = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!imgEX.exec(fileExtension)) {
      window.open(file.url, "_blank");
      return;
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    console.log("object");
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
    setErrors((prev) => ({ ...prev, files: "" }));
  };

  const validateForm = () => {
    let isError = false;
    if (!editMode) {
      if (!title) {
        setErrors((prev) => ({
          ...prev,
          title: "Title required : Please add a title",
        }));
        isError = true;
      }
      if (!hours) {
        setErrors((prev) => ({
          ...prev,
          hours:
            "Time required : Please add a Valid time (0 < hours < 24 , 0 < minutes < 60)",
        }));
        isError = true;
      }
      if (!description) {
        setErrors((prev) => ({
          ...prev,
          description: "Description required : Please add a description",
        }));
        isError = true;
      }
    } else {
      if (!lessonDateChanged.title) {
        setErrors((prev) => ({
          ...prev,
          title: "Title required : Please add a title",
        }));
        isError = true;
      }
      if (!lessonDateChanged.description) {
        setErrors((prev) => ({
          ...prev,
          description: "Description required : Please add a description",
        }));
        isError = true;
      }
      if (!lessonDateChanged.hours) {
        setErrors((prev) => ({
          ...prev,
          description: "Description required : Please add a description",
        }));
        isError = true;
      }
    }
    if (files.length === 0 && filesChanged.length === 0) {
      console.log("object");
      setErrors((prev) => ({
        ...prev,
        files: "Resources required : Please add a Resources",
      }));
      isError = true;
    }
    console.log(isError);
    return isError;
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setErrors({ title: "", description: "", files: "", hours: "" });

    const isError = validateForm();
    console.log(isError);
    if (isError) {
      return;
    }

    let data = {
      course_id: lessonDateEdit.course_id,
      module_id: lessonDateEdit.module_id,
      id: lessonDateEdit.id,
    };

    if (editMode) {
      console.log("object");
      title !== lessonDateChanged.title
        ? (data = { ...data, name: lessonDateChanged.title })
        : (data = { ...data });
      description !== lessonDateChanged.description
        ? (data = { ...data, description: lessonDateChanged.description })
        : (data = { ...data });
      hours !== lessonDateChanged.hours
        ? (data = {
            ...data,
            hours: convertToTimeFormat(lessonDateChanged.hours),
          })
        : (data = { ...data });
      files !== filesChanged
        ? (data = { ...data, file: filesChanged })
        : (data = { ...data });
      await dispatch(handleEditLesson(data));
    } else {
      data = {
        name: title,
        hours: convertToTimeFormat(hours),
        description,
        file: files,
      };
      console.log(data);
      await dispatch(handleAddLesson(data));
    }
    console.log("lessonDateChanged", data);
    await dispatch(handleGetModules(Number(params.courseId)));

    setOpen(false);
    setTitle("");
    setHours({ hours: null, minutes: null });
    setDescription("");
    setFiles([]);
    setFileList([]);
    setErrors({ title: "", description: "", files: "", hours: "" });
    setFilesChanged([]);
    dispatch(clearEditLessonData());
  };

  function convertToTimeFormat(time) {
    const paddedHours =
      time.hours.length < 2 ? String(time.hours).padStart(2, "0") : time.hours;
    const paddedMinutes =
      time.minutes.length < 2
        ? String(time.minutes).padStart(2, "0")
        : time.minutes;

    const timeFormat = `${paddedHours}:${paddedMinutes}`;

    return timeFormat;
  }

  return (
    <>
      <Modal
        centered
        open={open}
        className="lessonModal w-50 "
        title={editMode ? `Edit Lesson` : `Add New Lesson`}
        onCancel={handleCancel}
        footer={[
          <div className="d-flex justify-content-center">
            <Button
              key="submit"
              type="primary"
              onClick={(e) => handleOk(e)}
              className="modalSubmitBtn"
            >
              Submit
            </Button>
          </div>,
        ]}
      >
        <div className="container">
          <Form
            layout="vertical"
            className="d-flex flex-column justify-content-center "
          >
            <Form.Item label="Title">
              <Input
                value={editMode ? lessonDateChanged.title : title}
                onChange={(e) =>
                  editMode
                    ? setLessonDateChanged((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    : setTitle(e.target.value)
                }
              />
            </Form.Item>
            {errors.title && (
              <Alert className="mb-2" message={errors.title} type="error" />
            )}
            <Form.Item label="Time">
              <Row className="gap-3">
                <Col
                  span={{ xs: 24, lg: 11 }}
                  className="d-flex align-items-center gap-3"
                >
                  <Col span={10}>
                    <span>Hours&nbsp;&nbsp;</span>
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      min={0}
                      max={24}
                      maxLength={2}
                      value={
                        editMode ? lessonDateChanged.hours.hours : hours.hours
                      }
                      onChange={(e) => {
                        if (
                          e.target.value.length > 2 ||
                          e.target.value > 24 ||
                          e.target.value < 0
                        ) {
                          return;
                        }
                        return editMode
                          ? setLessonDateChanged((prev) => ({
                              ...prev,
                              hours: {
                                ...prev.hours,
                                hours: e.target.value,
                              },
                            }))
                          : setHours((prev) => ({
                              ...prev,
                              hours: e.target.value,
                            }));
                      }}
                    />
                  </Col>
                </Col>
                <Col
                  span={{ xs: 24, lg: 11 }}
                  className="d-flex align-items-center gap-3"
                >
                  <Col span={10}>
                    <span>Minutes</span>
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      min={0}
                      max={60}
                      value={
                        editMode
                          ? lessonDateChanged.hours.minutes
                          : hours.minutes
                      }
                      onChange={(e) => {
                        if (
                          e.target.value.length > 2 ||
                          e.target.value > 60 ||
                          e.target.value < 0
                        ) {
                          return;
                        }
                        return editMode
                          ? setLessonDateChanged((prev) => ({
                              ...prev,
                              hours: {
                                ...prev.hours,
                                minutes: e.target.value,
                              },
                            }))
                          : setHours((prev) => ({
                              ...prev,
                              minutes: e.target.value,
                            }));
                      }}
                    />
                  </Col>
                </Col>
              </Row>
            </Form.Item>
            {errors.hours && (
              <Alert className="mb-2" message={errors.hours} type="error" />
            )}

            <Form.Item label="Description">
              <TextArea
                rows={4}
                value={editMode ? lessonDateChanged.description : description}
                onChange={(e) =>
                  editMode
                    ? setLessonDateChanged((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    : setDescription(e.target.value)
                }
              />
            </Form.Item>
            {errors.description && (
              <Alert
                className="mb-2"
                message={errors.description}
                type="error"
              />
            )}
            <Form.Item className="mb-0" label="Upload" valuePropName="fileList">
              <Upload
                beforeUpload={(file) => addFiles(file)}
                action="/upload.do"
                listType="picture-card"
                onPreview={handlePreview}
                fileList={fileList}
                onChange={handleChange}
                onRemove={async(file) => {
                  const index = files.indexOf(file);
                  const newFileList = files.slice();
                  newFileList.splice(index, 1);
                  const FileToRemove = files.find(
                    (f) =>
                      f.path.slice(f.path.lastIndexOf("_") + 1) == file.name
                  );
                  if (FileToRemove) {
                    const confirmCancle = confirm(
                      "Are you sure you want to remove this file"
                    );
                    if (confirmCancle) {
                      await dispatch(handleDeleteResource(FileToRemove.id));
                      dispatch(handleGetModules(Number(params.courseId)))
                    }
                  }
                }}
              >
                <div className="py-3">
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                  <div>Drag & drop any file</div>
                  <div className="styledDiv">
                    or <span>browser file</span> from device
                  </div>
                </div>
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancelModal}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            {errors.files && (
              <Alert className="mb-2" message={errors.files} type="error" />
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ModalLesson;

import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { ModalTypes } from "../../../../Services/Interfaces/modalTypes";
import { Button, Modal, Alert } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import { ModuleEditData, clearEditModuleData, handleCreateModule, handleEditModule } from "../../../../Redux/Slices/AddLessonSlices/ModuleSlice";
import { useParams } from "react-router-dom";

const ModalModule = ({ setOpen, open }: ModalTypes) => {
  const {moduleId,title} = useAppSelector(ModuleEditData)
  const params = useParams();
  const [moduleTitle, setModuleTitle] = useState('');
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    setModuleTitle(title);
  }, [title]);
  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (moduleTitle === "" || moduleTitle === null) {
      setError("Must add title, this can not be empty");
    } else {
      if(moduleId){
        dispatch(
          handleEditModule({
            moduleId,
            title: moduleTitle,
            course_id: Number(params.courseId),
          })
        );
      }else{
        dispatch(
          handleCreateModule({
            course_id: Number(params.courseId),
            name: moduleTitle,
          })
        );
      }
     handleCancel()
    }
  };

  const handleCancel = () => {
    setOpen!(false);
    dispatch(clearEditModuleData());
    // setModuleTitle("");
    setError("");
  };

  return (
    <>
      <Modal
        open={open}
        className="lessonModal w-50 "
        title={`Add New Lesson`} // logic for editing the user
        onOk={(e) => handleOk(e)}
        onCancel={handleCancel}
        footer={[
          <div className="d-flex flex-column w-100 justify-content-center align-items-center gap-2">
            <Button
              style={{ margin: 0 }}
              key="submit"
              type="primary"
              onClick={handleOk}
              className="modalSubmitBtn"
            >
              Submit
            </Button>
          </div>,
        ]}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Module Title</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter title"
              required
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
            />
          </Form.Group>
          {error && <Alert message={error} type="error" />}
        </Form>
      </Modal>
    </>
  );
};

export default ModalModule;

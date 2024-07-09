import { useState } from "react";
import { Col, Row } from "antd";
import styles from "./ModulesCreation.module.css";

import Modules from "./Modules/Modules";
import ModuleModalBtn from "./ModuleModalBtn/ModuleModalBtn";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { useEffect } from "react";
import {
  handleGetModules,
  loading,
  moduleData,
  courseName,
} from "../../Redux/Slices/AddLessonSlices/ModuleSlice";
import ModalLesson from "./Modules/LessonModalBtn/ModalComp";
import ModalModule from "./ModuleModalBtn/ModalComp";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

function ModulesCreation() {
  const params = useParams();
  const [openLesson, setOpenLesson] = useState(false);
  const [openModule, setOpenModule] = useState(false);

  const modules = useAppSelector(moduleData);
  const courseTitle = useAppSelector(courseName);
  const { modulesLoading } = useAppSelector(loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const coureseId = Number(params.courseId);
    dispatch(handleGetModules(coureseId));
  }, [params, dispatch]);


  const handleEditModuleOpen=() => {
    setOpenModule(true)
  }

  return (
    <Container>
      <div className={styles.addLessonsContainer}>
        <Row justify="space-between" className="mb-3">
          <Col xl={4} md={6} sm={12} className={styles.courseTitle}>
            {courseTitle}
          </Col>
          <Col xl={4} md={6} sm={12} className="d-flex justify-content-end">
            <ModuleModalBtn open={openModule} setOpen={setOpenModule} />
          </Col>
        </Row>

        <ModalModule
          setOpen={setOpenModule}
          open={openModule}
        />

        {modulesLoading ? (
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin fs-3 s"></i>
          </div>
        ) : (
          <>
            {modules &&
              modules.map((m) => {
                return (
                  <Row className="mb-3" key={m.id}>
                    <Col span={24}>
                      <Modules
                        moduleId={m.id}
                        lessons={m.lessons || []}
                        open={openLesson}
                        setOpen={setOpenLesson}
                        title={m.name}
                        editModuleOpen={handleEditModuleOpen}
                      />
                    </Col>
                  </Row>
                );
              })}
            {modules.length < 1 && (
              <div className="text-center">
                No modules found in this module{" "}
              </div>
            )}
          </>
        )}

        <ModalLesson open={openLesson} setOpen={setOpenLesson} />
      </div>
    </Container>
  );
}

export default ModulesCreation;

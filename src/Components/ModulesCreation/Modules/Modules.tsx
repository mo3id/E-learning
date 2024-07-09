import { Col, CollapseProps } from "antd";
import { Collapse, Row } from "antd";
import LessonModalBtn from "./LessonModalBtn/LessonModalBtn";
import {
  ModuleTypes,
  lessonsType,
} from "../../../Services/Interfaces/modalTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modules.module.css";

import RessourseItems from "../../RessourseItems/RessourseItems";
import { useAppDispatch } from "../../../Hooks/ReduxHook";
import {
  handleDeleteModule,
  handleGetModules,
  setEditModuleData,
} from "../../../Redux/Slices/AddLessonSlices/ModuleSlice";
import {
  handleDeleteLesson,
  setEditLessonData,
} from "../../../Redux/Slices/AddLessonSlices/LessonSlice";
import { useParams } from "react-router-dom";

function Modules({
  moduleId,
  title,
  open,
  setOpen,
  lessons,
  editModuleOpen,
}: ModuleTypes) {
  const dispach = useAppDispatch();
  const params = useParams();

  const editModule = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    moduleId: number
  ) => {
    event.stopPropagation();
    dispach(setEditModuleData({ moduleId, title }));
    editModuleOpen();
  };

  const deleteModule = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const confirmCancle = confirm(
      `Are you sure you want to delete ${title}`
    );
    if (confirmCancle) {
      const coureseId = Number(params.courseId);
      await dispach(handleDeleteModule(moduleId));
      dispach(handleGetModules(coureseId));
    }
  };

  const editLesson = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    lesson: lessonsType
  ) => {
    event.stopPropagation();
    dispach(setEditLessonData(lesson));
    setOpen(true);
  };

  const deleteLesson = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string,
    name:string
  ) => {
    event.stopPropagation();

    const confirmCancle = confirm(
      `Are you sure you want to delete ${name}`
    );
    if (confirmCancle) {
      const coureseId = Number(params.courseId);
      await dispach(handleDeleteLesson(id));
      dispach(handleGetModules(coureseId));
    }
  };

  const itemsNest: CollapseProps["items"] = lessons.map((lesson) => {
    return {
      key: lesson.id,
      label: (
        <div className="d-flex justify-content-between">
          <span>{lesson.name}</span>
          <span
            className="d-flex gap-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon
              size="lg"
              className={styles.icons}
              icon={faPenToSquare}
              onClick={(e) => editLesson(e, lesson)}
            />
            <FontAwesomeIcon
              size="lg"
              className={styles.icons}
              icon={faTrash}
              onClick={(e) => deleteLesson(e, lesson.id,lesson.name)}
            />
          </span>
        </div>
      ),
      children: (
        <div>
          <p>{lesson.description}</p>
          <RessourseItems resources={lesson.resources}></RessourseItems>
        </div>
      ),
    };
  });

  const items: CollapseProps["items"] = [
    {
      key: moduleId,
      label: <span className="data">{title}</span>,
      extra: (
        <span
          className="d-flex gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon
            size="lg"
            className={styles.icons}
            icon={faPenToSquare}
            onClick={(e) => editModule(e, moduleId)}
          />
          <FontAwesomeIcon
            size="lg"
            className={styles.icons}
            icon={faTrash}
            onClick={(e) => deleteModule(e)}
          />
        </span>
      ),
      children: (
        <>
          {itemsNest.length > 0 ? (
            <Collapse items={itemsNest} />
          ) : (
            <p className="text-center">No lesson found in this module </p>
          )}
          <Row justify="center" className="mt-3">
            <Col>
              <LessonModalBtn
                open={open}
                setOpen={setOpen}
                moduleId={moduleId}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return <Collapse items={items} />;
}

export default Modules;

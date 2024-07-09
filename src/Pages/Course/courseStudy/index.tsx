import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { User } from "../../../Redux/Slices/UserSlice";
import { CourseInterFace } from "../../../Services/Interfaces/course";
import { useState, useEffect, useRef } from "react";
import styles from "./CourseDetails.module.css";
import { useParams } from "react-router-dom";
import { viewDetails } from "../../../Redux/Slices/CourseSlice";
import StudyRessourseItems from "../../../Components/StudyRessourseItems";
import { Menu } from "antd";

type ModulesApiType = {
  name?: string;
  id?: string | number;
  lessons?: [];
};
type lessonINterface = {
  id?: number;
  name?: string;
  description?: string;
  course_id?: number;
  module_id?: number;
  resources?: [];
};

export default function CourseStudy() {
  const { id } = useParams();
  const { isLogged } = useAppSelector(User);
  const [openLesson, setOpenLesson] = useState({} as lessonINterface);
  const dispatch = useAppDispatch();
  const LessonsLength = useRef(0);
  const [showData, setShowData] = useState({} as CourseInterFace);

  useEffect(() => {
    handleData(id);
    return () => {
      LessonsLength.current = 0;
    };
  }, []);

  async function handleData(id: string | undefined) {
    const { payload } = await dispatch(viewDetails(id));
    if (payload.success) {
      setShowData(payload.data);
      if (payload.data.modules.length > 0) {
        payload.data.modules.forEach((e: ModulesApiType) => {
          LessonsLength.current += e.lessons?.length || 0;
        });
      }
    }
  }
  return (
    <Container>
      {isLogged && (
        <Row>
          <Col md={4}>
            <h5 className={styles.headingColor}>Course Content:</h5>
            {showData?.modules?.length ? (
              <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={["0"]}
                items={showData?.modules?.map(
                  (m: ModulesApiType, index: number) => {
                    return {
                      key: index,
                      label: `Module ${index + 1}: ${m.name}`,
                      children: m.lessons?.map(
                        (lesson: lessonINterface, i: number) => {
                          return {
                            key: lesson.id,
                            style: { paddingLeft: "2rem" },
                            // disabled: true,
                            onClick: () => setOpenLesson(lesson),
                            label: `> Lesson ${index + 1}-${i + 1}: ${
                              lesson.name
                            }`,
                          };
                        }
                      ),
                    };
                  }
                )}
                // className={style.sideMenu}
              />
            ) : (
              <p className="text-center fs-5">No content yet</p>
            )}
          </Col>
          <Col>
            <p>{openLesson.description}</p>
            <StudyRessourseItems resources={openLesson.resources} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

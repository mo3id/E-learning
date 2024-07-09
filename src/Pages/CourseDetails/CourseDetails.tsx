import { Col, Rate } from "antd";
import { Container, Row } from "react-bootstrap";
import styles from "./CourseDetails.module.css";
import { CourseInterFace } from "../../Services/Interfaces/course";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { viewDetails } from "../../Redux/Slices/CourseSlice";
import Modules from "./ModulesCreation/Modules/Modules";
import { User } from "../../Redux/Slices/UserSlice";

type ModulesApiType = {
  name?: string;
  id?: string | number;
  lessons?: [];
};

export default function CourseDetails() {
  const { id } = useParams();
  const { userData } = useAppSelector(User);
  const [openLesson, setOpenLesson] = useState(false);
  const dispatch = useAppDispatch();
  const LessonsLength = useRef(0);
  const [showData, setShowData] = useState({} as CourseInterFace);
  // const [lessonsNum, setLessonsNum] = useState(0);

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

        console.log(LessonsLength);
      }
    }
  }

  return (
    <>
      <Container className={styles.marginTop}>
        <Row className={styles.bannerDetails}>
          <Col lg="5" className={styles.header}>
            <p className={styles.title}>{showData.name}</p>
            <p className={styles.description}>{showData.description}</p>
            <p>
              Created By :{" "}
              <span className={styles.createBy}>
                {" "}
                {`${showData.teacher?.first_name} ${showData.teacher?.last_name}`}
              </span>
            </p>
            <Row>
              <Col xs={10}>Started At : {showData?.created_from}</Col>
              <Col xs={10}>Last Update : {showData?.updated_from}</Col>
            </Row>
            <Rate
              allowHalf
              disabled
              defaultValue={3}
              className="stars stars-details"
            />
          </Col>
        </Row>
        <Container>
          <Row className="justify-content-between mt-5">
            <Col xl={6} lg={9} md={13} xxl={9}>
              <h3 className={styles.headingColor}>What you will learn:</h3>
              {showData.target?.map((item) => (
                <p className={styles.learnSection}>
                  <span>
                    <i
                      className={`fa-sharp fa-regular fa-circle-check fs-4 ${styles.checked}`}
                    ></i>
                  </span>{" "}
                  <span>{item}</span>
                </p>
              ))}
              <h3
                className={`${styles.headingColor} mt-4 ${styles.gap20} d-flex`}
              >
                <span>Subject:</span>{" "}
                <span className={`${styles.learnSection} fs-4`}>
                  {showData.subject}
                </span>
              </h3>
              <h3
                className={`${styles.headingColor} mt-4 ${styles.gap20} d-flex`}
              >
                <span>Grade:</span>{" "}
                <span className={`${styles.learnSection} fs-4`}>
                  {showData.grade}
                </span>
              </h3>
            </Col>

            <Col
              xl={6}
              lg={9}
              md={10}
              xxl={6}
              className={`${styles.fixedCard} d-flex flex-column`}
            >
              <div>
                <img src={`${showData?.photo}`} className="w-100" />
              </div>
              <div className={styles.content}>
                <h4>This course includes :</h4>
                <ul className="list-unstyled p-2 fs-6 ">
                  <li>
                    <Row className="gap-2 mb-1">
                      <Col xs={1}>
                        <i className="fa-regular fa-clock"></i>
                      </Col>
                      <Col xs={18}>
                        {" "}
                        <div>
                          {showData?.hours}&nbsp;
                          <span>hours on-demand video</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row className="gap-2 mb-1">
                      <Col xs={1}>
                        <i className="fa-solid fa-file-circle-question"></i>
                      </Col>
                      <Col xs={18}>
                        <span>Assignments</span>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row className="gap-2 mb-1">
                      <Col xs={1}>
                        <i className="fa-regular fa-bookmark "></i>
                      </Col>
                      <Col xs={18}>
                        <div className="ps-1">
                          {showData?.modules?.length}&nbsp;<span>Modules</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row className="gap-2 mb-1">
                      <Col xs={1}>
                        <i className="fa-regular fa-address-book"></i>
                      </Col>
                      <Col xs={18}>
                        <div>
                          {LessonsLength.current}&nbsp;<span>lessons</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row className="gap-2 mb-1">
                      <Col xs={1}>
                        <i className="fa-solid fa-tv"></i>
                      </Col>
                      <Col xs={18}>
                        <span>Access on mobile and TV</span>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row className="gap-2 mb-1">
                      <Col xs={1}>
                        <i className="fa-regular fa-keyboard"></i>
                      </Col>
                      <Col xs={18}>
                        <span>Full lifetime access</span>
                      </Col>
                    </Row>
                  </li>
                </ul>
                {userData.role === "teacher" ? (
                  <Link className="btn btn-primary gray_btn mt-2" to={"./edit"}>
                    Edit
                  </Link>
                ) : (
                  <Link
                    className="btn btn-primary gray_btn mt-2"
                    to={"./courseStudy"}
                  >
                    Start study
                  </Link>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <h3 className={styles.headingColor}>Content:</h3>
            {showData?.modules?.length ? (
              showData.modules.map((m: ModulesApiType, index: number) => (
                <Row className="mb-3" key={m.id}>
                  <Col span={24}>
                    <Modules
                      id={m.id}
                      index={index}
                      open={openLesson}
                      setOpen={setOpenLesson}
                      title={m.name}
                      lessons={m.lessons || []}
                    />
                  </Col>
                </Row>
              ))
            ) : (
              <Row className="mb-3" key={1}>
                <Col span={24}>
                  <p className="text-center fs-5">No content yet</p>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
}

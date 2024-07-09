import { Col, Row, Tabs } from "antd";
import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { User } from "../../Redux/Slices/UserSlice";
import {
  allCoursesData,
  getStudentassesment,
} from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";

const AllAssignments = () => {
  const { userData } = useAppSelector(User);
  const allStudentCourses = useAppSelector(allCoursesData);

  console.log(userData);
  console.log(allStudentCourses);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudentassesment(userData.id!));
  }, []);

  return (
    <>
      <h3 className="mb-4">Assignments</h3>
      <Tabs
        defaultActiveKey="1"
        items={allStudentCourses.map((course) => {
          return {
            label: `${course.name}`,
            key: `${course.id}`,
            children: (
              <>
                {course.modules!.length > 0 ? (
                  <Row gutter={16}>
                    {course.modules!.length > 0 &&
                      course.modules!.map((module) =>
                        module.assessments != null ? (
                          <Col span={8} key={module.assessments.id}>
                            <Card bordered={false}>
                              {module.assessments.name}
                            </Card>
                            {/* {module.assessments.name} */}
                          </Col>
                        ) : (
                          <Col span={8}>
                            <Card
                              // title={module.assessments.name}
                              bordered={false}
                            >
                              {`${module.name} has no assesment`}
                            </Card>
                            {/* {module.assessments.name} */}
                          </Col>
                        )
                      )}
                  </Row>
                ) : (
                  <Col span={8}>
                    <Card bordered={false}>no assesment</Card>
                  </Col>
                )}
              </>
            ),
          };
        })}
      />
    </>
  );
};

export default AllAssignments;

import { Card, Col, Row, Progress, Avatar } from "antd";
import './information.css'
import {useSelector } from "react-redux";



const twoColors = { '0%': '#108ee9', '100%': '#87d068' };


const UserInformation: React.FC = () => {
  const { studentInfo } = useSelector(({ student }) => student)

  return (

    <>
      <div className="containerStudentInfo">
        <div className="space-align-container">
          <div className="nameAndavatar">
            <Avatar
              size={{ xs: 60, sm: 60, md: 64, lg: 70, xl: 80, xxl: 100 }}
              src={studentInfo.photo}
            />
            <p className="infotitle">{studentInfo.first_name} {studentInfo.last_name}</p>
          </div>

          <div className="space-align-block">
            <p className="infotitle">Email</p>
            <p>{studentInfo.email}</p>
          </div>

          <div className="space-align-block">
            <p className="infotitle">Phone Number</p>
            <p>{studentInfo.phone_number}</p>
          </div>

          <div className="space-align-block">
            <p><span className="infotitle">Grade:</span> {studentInfo.grade} </p>

            <p><span className="infotitle">Class:</span> {studentInfo.class}</p>
          </div>

        </div>


        <div className="space-align-block">
          <p className="infotitle">courses</p>

          <Row gutter={16}>
            {studentInfo.courses.map((course: string | number | any) => (
              <Col className="StudentInfoCard" xs={{ span: 24 }} sm={{span:12}} md={{ span: 8 }}>

                <Card key={course.id} title={course.name} bordered={false}>
                  <img className="imageofcard" src={course.photo} />

                  <p className="infotitle">{course.subject}</p>
                  <Progress percent={course.pivot.percentage} strokeColor={twoColors} />
                </Card>

              </Col>

            ))}



          </Row>
        </div>
      </div>


    </>
  );
}

export default UserInformation;

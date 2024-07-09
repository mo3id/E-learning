import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import {
  getStudentData,
  handleAsign,
  handleRemove,
} from "../../Redux/Slices/AddStudentSlices/OpenDrawer";
import { allCoursesData } from "../../Redux/Slices/CourseSlice";

import { MyFormValues } from "../../Services/Interfaces/userInterFace";
import styles from "./ModelRemoveStudent.module.css";
function ModelRemoveStudent({ isModalOpen, setIsModalOpen, id }) {
  const dispatch = useAppDispatch();

  const [studentData, setStudentData] = useState<MyFormValues>({});
  const allCourses = useAppSelector(allCoursesData);
  const [coursesStudentIn, setCoursesStudentIn] = useState([]);
  const [coursesStudentOut, setCoursesStudentOut] = useState([]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStudentData({});
    setCoursesStudentIn([]);
    setCoursesStudentOut([]);
  };
  const fetchStudentData = async () => {
    const { payload } = await dispatch(getStudentData(id));
    setStudentData(payload.data);
    coursesFilteration(allCourses, payload.data.courses);
  };

  const coursesFilteration = (teacherCourses: [], assignedCourses: []) => {

    const studentCoursesId = assignedCourses.map((element) => element.id);
    teacherCourses.forEach((element) => {
      if (studentCoursesId.includes(element.id)) {
        setCoursesStudentIn((prev) => {
          return [...prev, element];
        });
      } else {
        setCoursesStudentOut((prev) => {
          return [...prev, element];
        });
      }
    });
  };

  const addStudentToCourse = async (courseId) => {
    const { payload } = await dispatch(
      handleAsign({
        course_id: courseId,
        student_id: [id],
      })
    );
    if (payload.success) {
      const addedCourse = coursesStudentOut.filter((s) => s.id === courseId);
      const afterAddingCourse = coursesStudentOut.filter(
        (s) => s.id !== courseId
      );
      setCoursesStudentIn(prev=>[...prev, ...addedCourse]);
      setCoursesStudentOut(afterAddingCourse);
    }
  };
  const removeStudentFromCourse = async (courseId) => {
    const { payload } = await dispatch(
      handleRemove({
        course_id: courseId,
        student_id: [id],
      })
    );
    if (payload.success) {
      const removedCourse = coursesStudentIn.filter((s) => s.id === courseId);
      const afterRemovingCourse = coursesStudentIn.filter(
        (s) => s.id !== courseId
      );
      setCoursesStudentOut((prev) => [...prev, ...removedCourse]);
      setCoursesStudentIn(afterRemovingCourse);
    }
  };

  useEffect(() => {
  }, [coursesStudentIn, coursesStudentOut]);
  useEffect(() => {
    if (isModalOpen) {
      setCoursesStudentIn([]);
      setCoursesStudentOut([]);
      fetchStudentData();
    }
  }, [isModalOpen]);

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.modContainer}>
          <h4>
            Student {studentData.first_name} {studentData.last_name} is assigned
            at :
          </h4>
          {coursesStudentIn && coursesStudentIn.length > 0 ? (
            coursesStudentIn.map((course) => (
              <div
                className={`d-flex justify-content-between my-2 ${styles.ItemRow} align-items-center`}
              >
                <h5 className={styles.courseTitle}>{course.name}</h5>
                <button
                  className={`btn btn-primary ${styles.removeBtnStudent}`}
                  onClick={() => removeStudentFromCourse(course.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className={`text-center`}>No Courses</p>
          )}
          <h4 className="mt-3">
            Add {studentData.first_name} {studentData.last_name} in:
          </h4>
          {coursesStudentOut && coursesStudentOut.length > 0 ? (
            coursesStudentOut.map((course) => (
              <div
                className={`d-flex justify-content-between my-2 ${styles.ItemRow} align-items-center`}
              >
                <h5 className={styles.courseTitle}>{course.name}</h5>
                <button
                  className={`btn btn-primary ${styles.addBtnStudent}`}
                  onClick={() => addStudentToCourse(course.id)}
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className={`text-center`}>No Courses</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ModelRemoveStudent;

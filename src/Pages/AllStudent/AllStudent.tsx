import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import FilterAllStudent from "../../Components/FilterAllStudent/FilterAllStudent";
import styles from "./AllStudent.module.css";
import {
  clearDataStudents,
  studentData,
  studentError,
} from "../../Redux/Slices/AddStudentSlices/OpenDrawer";
import SearchComp from "../../Components/SearchComp/SearchComp";
import ModelRemoveStudent from "../../Components/ModelRemoveStudent/ModelRemoveStudent";
import { Alert } from "antd";
import { openModal } from "../../Redux/Slices/ModalSlice";
import { getInfoByStudent } from "../../Redux/Slices/studentSlice";
import CommonModal from "../../Components/studentDetails/modal";


export default function AllStudent() {
  const dispatch = useAppDispatch();
  const studentArr = useAppSelector(studentData);
  const studentErr = useAppSelector(studentError);
  const { isOpen } = useAppSelector(state => state.modal);

  useEffect(() => {
    console.log(studentArr);

    return () => {
      dispatch(clearDataStudents([]));
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currStudentId, setCurrStudentId] = useState('');
  const showModal = (id: any) => {
    setCurrStudentId(id)
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className={`row justify-content-between ${styles.rev}`}>
          <div className="col-xl-7 col-md-12">
            <SearchComp></SearchComp>
            <div className={styles.StudentConitainer}>
              {studentArr.length > 0 ? (
                <div>
                  <div
                    className={`row ${styles.rowStyle} justify-content-between`}
                  >
                    <div className="col-md-7  col-sm-12">Student Info</div>
                    <div className="col-md-2  col-sm-12">Details</div>
                    <div className="col-md-2  col-sm-12">Manage</div>
                  </div>
                  {studentArr.map((student: any) => (
                    <div className="row mb-3 mb-sm-5 justify-content-center">
                      <div className="col-xl-12 col-md-12 row justify-content-between align-items-center">
                        <div className=" col-md-7  col-sm-12  row justify-content-between">
                          <div className="  row justify-content-between">
                            <div className="col-2">
                              <div className={styles.imgContainer}>
                                <img src={student.photo} />
                              </div>
                            </div>
                            <div className="col-8">
                              <div className={styles.StudentInfo}>
                                <p className={styles.studentName}>
                                  {student.first_name}&nbsp;{student.last_name}
                                </p>
                                <p className={styles.studentEmail}>
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2  col-sm-12 ">
                          <button className={styles.details} onClick={() => {
                            dispatch(getInfoByStudent(student.id))
                              .unwrap()
                              .then(() => {
                                dispatch(openModal()),
                                  <CommonModal />
                              })
                              .catch((rejectedValueOrSerializedError: any) => {
                                <Alert message={rejectedValueOrSerializedError} />

                              })
                          }}>View Details</button>
                        </div>
                        <div className="col-md-2  col-sm-12 ">
                          <button className={styles.remove} onClick={() => showModal(student.id)}>
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row justify-content-center">
                  <p className={styles.noStudents}>{studentErr}</p>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className={styles.filterContainer}>
              {" "}
              <h3 className={styles.filter}>Filter</h3>
              <FilterAllStudent></FilterAllStudent>
            </div>
          </div>

        </div>
        {isOpen && <CommonModal />}

        <ModelRemoveStudent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          id={currStudentId}
        />
      </div>
    </>
  );
}

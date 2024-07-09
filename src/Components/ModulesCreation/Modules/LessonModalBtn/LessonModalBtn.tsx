import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../../ModulesCreation.module.css";
import { LessonModalTypes } from "../../../../Services/Interfaces/modalTypes";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../Hooks/ReduxHook";
import { setLessonData } from "../../../../Redux/Slices/AddLessonSlices/LessonSlice";

function LessonModalBtn({ setOpen, moduleId }: LessonModalTypes) {
  const params = useParams();
  const dispatch = useAppDispatch();

  const setDataToLesson = () => {
    const data = {
      courseId: params.courseId,
      moduleId: moduleId,
    };

    dispatch(setLessonData(data));
  };
  const showModal = () => {
    setOpen(true);
    setDataToLesson();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={styles.addModuleBtn}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Lesson
      </Button>
    </>
  );
}

export default LessonModalBtn;

// <Button className={styles.addLessonBtn}>
//   <FontAwesomeIcon icon={faPlus} />
//   Add Lesson
// </Button>;

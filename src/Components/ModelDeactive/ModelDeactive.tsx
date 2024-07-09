import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import styles from "./ModelDeactive.module.css";
const { confirm } = Modal;

import { handleEditCourse } from "../../Redux/Slices/CourseSlice";
import { store } from "../../Redux/Store/Store";

export default function ModelDeactive(id: number | string | undefined) {
  confirm({
    title: "Are you sure deactive this course?",
    icon: <ExclamationCircleFilled className={styles.deleteIconStyle} />,
    content:
      "Deactive course means you can't assign students to this course and no one can access course.",
    okText: "Confirm",
    okType: "danger",
    cancelText: "Cancel",
    async onOk() {
      const { payload } = await store.dispatch(
        handleEditCourse({ active: 0, id: id })
      );
      console.log(payload);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

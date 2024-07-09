import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../ModulesCreation.module.css";
import { Button } from "antd";
import { ModalTypes } from "../../../Services/Interfaces/modalTypes";

function ModuleModalBtn({ setOpen }: ModalTypes) {
  const showModal = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={styles.addModuleBtn}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Module
      </Button>
    </>
  );
}

export default ModuleModalBtn;

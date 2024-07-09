import { Modal } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import {
  hideResourcesModalReduser,
  isResourcesModalOpen,
  resourcesModalResource,
  resourcesModalTitle,
  resourcesModalType,
} from "../../Redux/Slices/ResourcesModalSlice";
import { store } from "../../Redux/Store/Store";
export default function ModelResource() {
  const open = useAppSelector(isResourcesModalOpen);
  const title = useAppSelector(resourcesModalTitle);
  const type = useAppSelector(resourcesModalType);
  const resource = useAppSelector(resourcesModalResource);
  const dispatch = useAppDispatch();
  const hideModal = () => {
    dispatch(hideResourcesModalReduser());
  };

  const { resourcesModal } = store.getState();
  console.log(resourcesModal);
  
  useEffect(() => {
    console.log(resource);
    console.log(open);
  }, [resource, open]);

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={hideModal}
        centered
        onCancel={hideModal}
        footer={null}
        width={1000}
      >
        {type === "image" ? (
          <img alt="example" style={{ width: "100%" }} src={resource} />
        ) : (
          <video width="100%" height={'500px'}  controls src={resource}></video>
        )}
      </Modal>
    </>
  );
}

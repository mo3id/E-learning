import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  RadioChangeEvent,
  Row,
  theme,
} from "antd";
import React, { useState } from "react";
import styles from "./StudentModel.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Tree, { DataNode } from "antd/es/tree";


export default function StudentModel() {

  const { token } = theme.useToken();
  const [openD, setOpenD] = useState(false);
  const [filterB, setfilterB] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    width: "93%",
  };

  const showDrawer = () => {
    setfilterB(!filterB);
    setOpenD(true);
  };

  const onClose = () => {
    setOpenD(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  const treeData: DataNode[] = [
    {
      title: "parent",
      key: "0",
      children: [
        {
          title: "child 1",
          key: "0-0",
          disabled: false,
          
        },
        {
          title: "child 2",
          key: "0-1",
          disabled: false,
        },
      ],
    },
  ];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Tree
          checkable
          defaultSelectedKeys={["0-1"]}
          defaultExpandAll
          treeData={treeData}
          blockNode
        />
      ),
    },
    {
      key: "2",
      label: (
        <Tree
          checkable
          defaultSelectedKeys={["0-1"]}
          defaultExpandAll
          treeData={treeData}
          blockNode
        />
      ),
    },
    {
      key: "3",
      label: (
        <Tree
          checkable
          defaultSelectedKeys={["0-1"]}
          defaultExpandAll
          treeData={treeData}
          blockNode
        />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized button props
      </Button>
      <Modal
        title="Manage students for this course :"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        className={styles.addStudent}
        width={1000}
      >
        <div className={styles.search}>
          <Row className="">
          <Col sm={20}>
              <Input
                size="large"
                placeholder="large size"
                prefix={<SearchOutlined />}
              />
            </Col>
          <Col sm={3}>
              <Button onClick={showDrawer}>
                Filter <i className="fa-solid fa-border-all ms-1"></i>
              </Button>
            </Col>
           
            {/* <Col sm={3}>  <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <Button>Filter <i className="fa-solid fa-border-all ms-1"></i></Button>
    </Dropdown></Col> */}
          
          </Row>
          {filterB ? (
            <div  className={styles.containerStyle}>
              <Drawer
                title="Filter Students"
                placement="top"
                closable={false}
                onClose={onClose}
                open={openD}
                getContainer={false}
              >
                <Tree
                  checkable
                  defaultSelectedKeys={["0-1"]}
                  defaultExpandAll
                  treeData={treeData}
                  blockNode
                  onClick={()=>console.log('KJJKJK')}
                />
              </Drawer>
            </div>
          ) : (
            ""
          )}
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
            nulla tenetur ea esse minima nesciunt nostrum deserunt rem error
            voluptatem? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Tempore nulla tenetur ea esse minima nesciunt nostrum deserunt
            rem error voluptatem? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Tempore nulla tenetur ea esse minima nesciunt
            nostrum deserunt rem error voluptatem? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Tempore nulla tenetur ea esse minima
            nesciunt nostrum deserunt rem error voluptatem? Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Tempore nulla tenetur ea esse
            minima nesciunt nostrum deserunt rem error voluptatem?
          </p>
        </div>
      </Modal>
    </>
  );
}

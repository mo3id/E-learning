import { SearchOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./studentAdding.module.css";
import { DataNode } from "antd/es/tree";
import FilterStudent from "../../Components/FilterStudent/FilterStudent";
import { clearDataStudents, handleAsign, handleFilter, handleRemove, openDra, studentData, studentQueryClass, studentQueryGrade } from "../../Redux/Slices/AddStudentSlices/OpenDrawer";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { MyFormValues } from "../../Services/Interfaces/userInterFace";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function studentAdding() {
  const { id }= useParams();
  const dispatch = useAppDispatch();
  //filter
  const treeData: DataNode[] = [
    {
      title: "Grades",
      key: "0",
      children: [
        {
          title: "Grade 1",
          key: "0-1",
          disabled: false,
        },
        {
          title: "Grade 2",
          key: "0-2",
          disabled: false,
        },
        {
          title: "Grade 3",
          key: "0-3",
          disabled: false,
        },
        {
          title: "Grade 4",
          key: "0-4",
          disabled: false,
        },
        {
          title: "Grade 5",
          key: "0-5",
          disabled: false,
        },
        {
          title: "Grade 6",
          key: "0-6",
          disabled: false,
        },
        {
          title: "Grade 7",
          key: "0-7",
          disabled: false,
        },
        {
          title: "Grade 8",
          key: "0-8",
          disabled: false,
        },
        {
          title: "Grade 9",
          key: "0-9",
          disabled: false,
        },
        {
          title: "Grade 10",
          key: "0-10",
          disabled: false,
        },
        {
          title: "Grade 11",
          key: "0-11",
          disabled: false,
        },
        {
          title: "Grade 12",
          key: "0-12",
          disabled: false,
        },
      ],

    },
    {
      title: "Classes",
      key: "1",
      children: [
        {
          title: "Class A",
          key: "1-A",
          disabled: false,
        },
        {
          title: "Class B",
          key: "1-B",
          disabled: false,
        },
        {
          title: "Class C",
          key: "1-C",
          disabled: false,
        },
        {
          title: "Class D",
          key: "1-D",
          disabled: false,
        },
        {
          title: "Class E",
          key: "1-E",
          disabled: false,
        },
      ],
    },

  ];
 const studentArr=useAppSelector(studentData)
 const queryClass=useAppSelector(studentQueryClass)
 const queryGrade=useAppSelector(studentQueryGrade)
  const [filterB, setfilterB] = useState(false);
  const [clickedRemove,setClickedRemove]=useState(false);
  const [clickedRemoveA11,setClickedRemoveA11]=useState(false);
  const [clickedAssignAll,setClickedAssignAll]=useState(false);
  const [addedStudent,setAddedStudent]=useState([] as number[]);
  const [removedStudent,setRemovedStudent]=useState([] as number[]);

  const [modifyStudentArr,setModifyStudentArr]=useState([] as {}[]);
  const assignStudent=(idStudent:number,index:number)=>{
    const modified = modifyStudentArr.map( (item:MyFormValues)=> item.id == idStudent ? {...item,isActive :true} : item )
 
    setModifyStudentArr(modified)
       dispatch(handleAsign({
      course_id:id,
      student_id:[idStudent]
       }))
    // setClickedRemove(false)
  }
  const removeStudent =(idStudent:number,index:number)=>{
    const modified = modifyStudentArr.map( (item:MyFormValues)=> item.id == idStudent ? {...item,isActive :false} : item )
    
    setModifyStudentArr(modified)
    
    //   dispatch remove

    
   dispatch(handleRemove({
    course_id:id,
    student_id:[idStudent]
   }))
    // setClickedRemove(true)
    setClickedRemoveA11(false)
    
  }

 let searshTimeOut:ReturnType<typeof setTimeout>;
 const SearchStudent=(searchName: string)=>{
  clearTimeout(searshTimeOut)
  searshTimeOut =  setTimeout(()=>{
    dispatch(handleFilter({queryGrade,queryClass,id,searchName}))
   },500)
   
 }
 const addAllStudent=()=>{
  const modified = modifyStudentArr.map( (item:MyFormValues)=> { return {...item,isActive :true} })
  modifyStudentArr.forEach((modifiedItem:any)=>{
     setAddedStudent((prev)=>[...prev,modifiedItem.id])
  })
 
  setModifyStudentArr(modified)

  setClickedRemoveA11(true)
  setClickedAssignAll(true)


 }
  const showDrawer = () => {

    setfilterB(!filterB);
    dispatch(openDra())
    
  };
  const removeAllStudent=()=>{
    const modified = modifyStudentArr.map( (item:MyFormValues)=> { return {...item,isActive :false} })
    
    modifyStudentArr.forEach((modifiedItem:any)=>{
      setAddedStudent((prev)=>[...prev,modifiedItem.id])
     
   })
        setRemovedStudent((prev)=>addedStudent.filter((value,index)=>addedStudent.indexOf(value)===index))
   
   setAddedStudent([])

  
    setModifyStudentArr(modified)
    setClickedRemove(false)
    setClickedRemoveA11(false)
  }
  useEffect(()=>{
 
    if(studentArr.length>0) {
      const NewArray:{}[]= studentArr.map((item:MyFormValues)=>({isActive:false,...item}))
      setModifyStudentArr(NewArray)
    }
    else{
      setModifyStudentArr(studentArr)
    }

  },[studentArr])
 useEffect(()=>{
  console.log('addedStudent');
  console.log(addedStudent);
  if(clickedAssignAll){
   dispatch(handleAsign({
    course_id:id,
    student_id:addedStudent
     }))
  console.log('trueeeee');
  
  }

 
   
 },[addedStudent])
 useEffect(()=>{
  console.log('removedStudent');
  
   console.log(removedStudent);
   dispatch(handleRemove({
    course_id:id,
    student_id:removedStudent
   }))
   
 },[removedStudent])

 useEffect(()=>{
  return ()=>{
    dispatch(clearDataStudents([]))
  }
 },[])
  return (
    <>
      <Container>
        <Row className={`justify-content-between gap-md-2 gap-sm-2 gap-md-2 ${styles.rev}`}>
          <Col xl={7} className="mt-5">
            <Input
              size="large"
              placeholder="Search By Name Or Email"
              prefix={<SearchOutlined />}
              onKeyUp={(e:any)=>SearchStudent(e.currentTarget.value)}
            />
           <div className={styles.StudentConitainer}>
            {modifyStudentArr.length>0?modifyStudentArr.map((item:any,index:number)=><div className={styles.itemContainer}>
              <Row className="align-items-center justify-content-between">
                <Col sm={1}><div className={styles.imgContainer}><img src={item.photo}/></div></Col>
                <Col sm={3}><div className={styles.StudentInfo}><p className={styles.studentName}>{item.first_name}&nbsp;{item.last_name}</p><p className={styles.studentEmail}>{item.email}</p></div></Col>
                <Col sm={1}>{item.isActive?<button className={styles.addIconClicked} onClick={()=>removeStudent(item.id,index)}><i className="fa-solid fa-check"></i></button>:<button className={styles.addIcon} onClick={()=>assignStudent(item.id,index)}><i className="fa-solid fa-plus"></i></button>}</Col>

              </Row>
             
            </div>):<p>No Student Yet</p>}
            {modifyStudentArr.length>0?<div className={styles.controlsStudent}>{clickedRemoveA11?<button className={styles.RemoveAll} onClick={removeAllStudent}>Remove All Students</button>:<button className={styles.AddAll} onClick={addAllStudent}>Add All Students</button>}</div>:''}
           </div>
          </Col>
          <Col xl={3}>
            <Row className="">
        <Col xl={3} className=" d-flex justify-content-end" >
        <Button onClick={showDrawer} className={`screen1900`}>
              Filter <i className="fa-solid fa-border-all ms-1"></i>
            </Button>
        </Col>
      
            </Row>
            <FilterStudent classN={`screen2000`} id={id!} treeData={treeData}></FilterStudent>
            {filterB ? (
            <FilterStudent classN={`screen1900`} id={id!} treeData={treeData}></FilterStudent>
            ) : (
              ""
            )}
          </Col>
        </Row>

      </Container>
      <Toaster></Toaster>
    </>
  );
}


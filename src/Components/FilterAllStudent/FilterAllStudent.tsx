import { useEffect, useState } from "react";
import {  Select, Space } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps} from "antd";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { allCoursesData } from "../../Redux/Slices/CourseSlice";
import { CourseInterFace } from "../../Services/Interfaces/course";


import styles from './FilterAllStudent.module.css'
import { filterationArray,  handleFilterAll } from "../../Redux/Slices/AddStudentSlices/OpenDrawer";
export default function FilterAllStudent() {
  const grades: SelectProps["options"] = [];
  const classes: SelectProps["options"] = [];
  const Courses: SelectProps["options"] = [];
  let queryClass=''
  let queryGrade=''
  let id=''

  const [classesfilter,setClassesfilter]=useState< string[]>([])
  const [gradesfilter,setGradesfilter]=useState<  string[]>([])
  const [coursefilter,setCoursefilter]=useState< string[]>([])
  const [checked,setChecked]=useState(1)
  const [started,setStarted] = useState(false)
  const [size, setSize] = useState<SizeType>("middle");
  const allCourses = useAppSelector(allCoursesData);
  let dispatch =useAppDispatch()
  for (let i = 1; i <= 12; i++) {
    grades.push({
      value: i,
      label: "Grade" + " " + i,
    });
  }
  const classesStatic = ["A", "B", "C", "D", "E"];

  classesStatic.map((classN) => {
    classes.push({
      value: classN,
      label: "class" + " " + classN,
    });
  });
  allCourses.map((course: CourseInterFace) => {
    Courses.push({
      value: course.id,
      label: course.name,
    });
  });

  const handleChangeGrades = (value:  string[]) => {
    console.log(value);
     setGradesfilter(value)
     setChecked((prev)=>++prev)
  };
  const handleChangeClass = (value:  string[]) => {
    console.log(value);
    setClassesfilter(value)
    setChecked((prev)=>++prev)
  };
  const handleChangeCourse = (value:  string[]) => {
    console.log(value);
    setCoursefilter(value)
    setChecked((prev)=>++prev)
  };
  const makeQuery =(classes:string[],grades:string[],courseId:string[])=>{
    classes.forEach((item)=>{
      queryClass+=`class[]=${item}&`
       
    })
    grades.forEach((item)=>{
      queryGrade+=`grade[]=${item}&`
      
   })
   courseId.forEach((item)=>{
    id+=`course_id[]=${item}&`
    
 })
   return Promise.resolve("Hello");
  }
  const filteration = async ()=>{

 
    await dispatch(handleFilterAll({queryClass,queryGrade,id}))
  
  }

  useEffect(() => {
    if(started){
      console.log("firstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirst")
      if(coursefilter.length>0){
        makeQuery(classesfilter,gradesfilter,coursefilter)
        dispatch(filterationArray({queryClass:queryClass,queryGrade:queryGrade,id:id}))
       
      }
      else{
        console.log(Courses);
       const course:any= Courses.map((item) => item.value )
       makeQuery(classesfilter,gradesfilter,course)
       dispatch(filterationArray({queryClass:queryClass,queryGrade:queryGrade,id:id}))
      }
      
      filteration()
    }
    setStarted(true)
  }, [checked]);
  return (
    <>
   
           
            <Space direction="vertical" style={{ width: "100%" }}>
            <h6 className={styles.filterTitle}>Select Grade:</h6>
              <Select
                mode="multiple"
                size={size}
                placeholder="Please grade"
                onChange={handleChangeGrades}
                style={{ width: "100%" }}
                options={grades}

              />
               <h6 className={styles.filterTitle}>Select Class:</h6>
              <Select
                mode="tags"
                size={size}
                placeholder="Please class"
                onChange={handleChangeClass}
                style={{ width: "100%" }}
                options={classes}
              />
               <h6 className={styles.filterTitle}>Select Course:</h6>
              <Select
                mode="tags"
                size={size}
                // defaultValue={[`${Courses[0].label}`]}
                placeholder="Please course"
                onChange={handleChangeCourse}
                style={{ width: "100%" }}
                options={Courses}
              />
            </Space>
     
      
     
    </>
  );
}

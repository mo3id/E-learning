import React, { useCallback, useEffect, useState } from "react";
import styles from "./FilterStudent.module.css";
import { Drawer } from "antd";
import Tree, { DataNode } from "antd/es/tree";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { drawerState, filterationArray, handleFilter } from "../../Redux/Slices/AddStudentSlices/OpenDrawer";
 interface Prop{
  classN:string;
  id:string
  treeData:DataNode[]
 }
export default function FilterStudent({classN,id,treeData}:Prop) {

  const dispatch=useAppDispatch()
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [started,setStarted] = useState(false)
  const [checked,SetChecked]=useState(1)
  
  let queryClass=''
  let queryGrade=''
  // const [queryClass,setQueryClass]=useState('')
  // const [queryGrade,setQueryGrade]=useState('')
  const drawerOpener = useAppSelector(drawerState);



  //   const showDrawer = () => {

  //     setOpenD(true);

  //   };
  const filteration = (dataFilter: []) => {
    if (dataFilter.length == 0) {
      setGrades([]);
      setClasses([]);
    } else {
      dataFilter.map((item: string) => {
        if (item.includes("0-")) {
          if (!grades.includes(item)) {
            setGrades((prev) => [...prev, item]);
          }
        } else if (item.includes("1-")) {
          if (!classes.includes(item)) {
            setClasses((prev) => [...prev, item]);
          }
        }
      });
    }
    return Promise.resolve("Hello");
  };
  const removeUnchecked = (
    checkedKeys: string[],
    grades: string[],
    classes: string[]
  ) => {
    grades.map((gradeItem: string) => {
      if (!checkedKeys.includes(gradeItem)) {
        setGrades((prev) => prev.filter((itemG) => itemG != gradeItem));
      }
    });
    classes.map((classE: string) => {
      if (!checkedKeys.includes(classE)) {
        setClasses((prev) => prev.filter((itemG) => itemG != classE));
      }
    });
     return Promise.resolve("Hello");
  };
  const removeUnusedKeys = (grades: string[], classes: string[]) => {
    setGrades((prev) => prev.map((grade) => grade.replace("0-", "")));

    setClasses((prev) => prev.map((classE) => classE.replace("1-", "")));
     return Promise.resolve("Hello");
  };
  const onCheck = async(checkedKeysValue: any) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    await filteration(checkedKeysValue);
    await removeUnchecked(checkedKeysValue, grades, classes);
    await removeUnusedKeys(grades, classes);
    SetChecked((prev)=>++prev)
    console.log(checked)
    // await makeQuery(classes,grades)

    
    // dispatch(handleFilter({queryClass,queryGrade}))

  };
  const makeQuery =(classes:string[],grades:string[])=>{
    console.log("first")
    classes.forEach((item)=>{
      queryClass+=`class[]=${item}&`
       
    })
    grades.forEach((item)=>{
      queryGrade+=`grade[]=${item}&`
      
   })
   return Promise.resolve("Hello");
  }
  
  const finish = async ()=>{
    console.log("asdasdasdsa")
    await makeQuery(classes,grades)
    await dispatch(handleFilter({queryClass,queryGrade,id}))
     dispatch(filterationArray({queryClass,queryGrade}))
  }

  useEffect(() => {
    if(started){
      console.log("firstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirst")
      finish()
    }
    setStarted(true)
  }, [checked]);
  return (
    <>
    {classN=='screen2000'? <div className={`${styles.screen2000} ${styles.screen2000Style}`}>
          <h3>Filter</h3> 
       <Tree
            checkable
            defaultExpandAll
            onCheck={onCheck}
            treeData={treeData}
          />
      </div>: <div className={`${styles.containerStyle} ${styles.screen1900}`}>
        <div className={styles.screen1900}>
        <Drawer
          title="Filter Students"
          placement="top"
          closable={false}
          // onClose={onClose}
          open={drawerOpener}
          getContainer={false}
        >
          <Tree
            checkable
            defaultExpandAll
            onCheck={onCheck}
            treeData={treeData}
          />
        </Drawer>
        </div>
      </div>}
     
     
    </>
  );
}

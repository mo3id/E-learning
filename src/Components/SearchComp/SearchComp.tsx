import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'
import { handleFilterAll, studentQueryClass, studentQueryGrade, studentQueryId } from '../../Redux/Slices/AddStudentSlices/OpenDrawer';
import { useAppDispatch, useAppSelector } from '../../Hooks/ReduxHook';

export default function SearchComp() {
    const studentId = useAppSelector(studentQueryId);
    const studentClass = useAppSelector(studentQueryClass);
    const studentGrade = useAppSelector(studentQueryGrade);
     const dispatch =useAppDispatch()
    let searshTimeOut:ReturnType<typeof setTimeout>;
    const SearchStudent=(searchName: string)=>{
     clearTimeout(searshTimeOut)
     searshTimeOut =  setTimeout(()=>{
       dispatch(handleFilterAll({queryGrade:studentGrade,queryClass:studentClass,id:studentId,searchName}))
      },500)
      
    }
    console.log(studentId);
    console.log(studentClass);
    console.log(studentGrade);
    
  return<>
         <Input
              size="large"
              placeholder="Search By Name Or Email"
              prefix={<SearchOutlined />}
              onKeyUp={(e:any)=>SearchStudent(e.currentTarget.value)}
            />
  </>
}

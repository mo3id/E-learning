import { useEffect } from 'react'
import ModelVerfication from '../../Components/ModelVerfication/ModelVerfication'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../Hooks/ReduxHook'
import { Confirmed } from '../../Redux/Slices/UserSlice'
import toast, { Toaster } from 'react-hot-toast'

function VerfiyRegester() {
  const navigate = useNavigate()
  const {registerConfirmed} =useAppSelector(Confirmed)
  
  const redirect = ()=>{
    localStorage.removeItem('userEmail')
    navigate("/auth/login")
   
  }
  useEffect(()=>{
 if(registerConfirmed){
  toast.success('You have been registered successfully');
 }
  
  },[])
  return (
   <>
    <ModelVerfication redirectPath={redirect}/>
    <Toaster></Toaster>
   </>
  )
}

export default VerfiyRegester
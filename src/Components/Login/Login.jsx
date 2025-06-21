import React, { useState } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import { useFormik } from 'formik'
import axios from 'axios'
import { Bounce, toast,ToastContainer } from 'react-toastify'
import * as yup from"yup"
import { useNavigate } from 'react-router-dom'
export default function Login() {

const [loading,setLoading]=useState(false)
const navigate=useNavigate()
  const validationSchema = yup.object({
  username: yup
       .string()
       .min(3, "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل")
       .max(25, "يجب ألا يتجاوز اسم المستخدم 25 حرفًا")
       .required("حقل مطلوب: يرجى إدخال اسم المستخدم"),
   
    password: yup
      .string()
      .min(9, "يجب أن تتكون كلمة المرور من 9 أحرف أو أرقام على الأقل")
      .max(30, "يجب ألا تتجاوز كلمة المرور 30 حرفًا أو رقمًا")
      .required("حقل مطلوب: يرجى إدخال كلمة المرور"),
        
  });

 

  const handleSubmit = (values) => {
    setLoading(true);
    // Ensure that 'values' includes 'username' and 'password' keys.
    const params = new URLSearchParams();
    params.append('username', values.username);
    params.append('password', values.password);
  
    axios.post('https://vercel-api-deployment-iota.vercel.app/auth/login', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then((res) => {
      if ("access_token"in res.data) {
        setLoading(false);
        localStorage.setItem("Token",res.data.access_token)
        toast.success("تم التسجيل بنجاح");
        navigate("/");
      }
    })
    .catch((err) => {
        console.log(err.response);
        
        setLoading(false);
      if(err.response.data.detail==="Incorrect username, email, or password")
      {
        toast.error("هناك خطأ ف البريد الالكتروني او كلمه المرور")
      }
      toast.error("هناك خطأ في عمليه التسجيل");
    });
  }
  
  const formik=useFormik({
    initialValues:
      {
        email: "",
        password: ""
      },
      onSubmit:handleSubmit,validationSchema
    
  })
  const heroObj={
    title:'تسجيل الدخول',
    font:''
  }
  return (
    <>
    <HeroSection  obj={heroObj}/>
<section id='Login' className='p-10 bg-cover  bg-[url("https://res.cloudinary.com/dnmwmrxmr/image/upload/f_auto,q_auto/cayzt5zecsl3r1ftojuq")]'>
<div className='lg:w-[50%] w-full px-3 lg:px-0 m-auto border-4 rounded-lg border-double shadow-2xl hover:border-green-500 py-5 '>

  <ToastContainer
  position="bottom-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={true}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  transition={Bounce}
  />
<form className=" md:px-10 mx-auto" onSubmit={formik.handleSubmit}>

<label htmlFor="username" className="block mb-2 text-lg font-medium text-white dark:text-white">اسم المستخدم</label>
  <div className="flex">
    <span className="inline-flex items-center px-3 text-sm text-green-900 bg-green-200 border border-e-0 border-green-300 rounded-s-md dark:bg-green-600 dark:text-green-400 dark:border-green-600">
      <svg className="w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>
    </span>
    <input  
      onChange={formik.handleChange}
       onBlur={formik.handleBlur}
      value={formik.values.username}
    type="text" id="username"
    name='username'
    className="rounded-none   rounded-e-lg bg-green-50 border
     border-green-300 text-green-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5 
      dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500
       dark:focus:border-green-500" placeholder="ادخل اسمك"/>
  </div>
        {formik.touched.username && formik.errors.username ? (
          
         <div className=' mt-3 bg-red-600 text-white font-normal text-lg p-2 rounded-lg'>{formik.errors.username}</div>
       ) : null}
  <label htmlFor="password" className="block mb-2 text-lg font-medium text-white dark:text-white mt-3 ">كلمه المرور</label>
  <div className="flex">
    <span className="inline-flex items-center px-3 text-sm text-green-900 bg-green-200 border border-e-0 border-green-300 rounded-s-md dark:bg-green-600 dark:text-green-400 dark:border-green-600">
    <i className="fa-solid fa-key text-green-500"></i>
    </span>
    <input 
      onChange={formik.handleChange}
       onBlur={formik.handleBlur}
      value={formik.values.password}
    type="password"
    name='password'
    id="password" className="rounded-none rounded-e-lg bg-green-50 border border-green-300 text-green-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="ادخل كلمه المرور"/>
  </div>

  {formik.touched.password && formik.errors.password ? (
         <div className='block mt-3 bg-red-600 text-white font-normal text-lg p-2 rounded-lg'>{formik.errors.password}</div>
       ) : null}
{loading?

<button type="submit"  disabled={!formik.isValid || !formik.dirty} className=' flex float-end mt-5 border-white
   hover:border-green-600 hover:bg-gradient-to-r focus:from-green-500
    focus:bg-slate-500 focus:transition focus:duration-200 hover:from-green-500
     hover:bg-slate-500 hover:transition hover:duration-200  font-bold border-2 border-solid text-white 
     py-3 px-4 rounded-full'>جاري التسجيل  <div role="status mx-2">
     <svg aria-hidden="true" className="inline w-6 mx-2 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
     </svg>
    
 </div> </button>
  
 
:


<button type="submit"  disabled={!formik.isValid || !formik.dirty} className=' float-end mt-5 border-white
   hover:border-green-600 hover:bg-gradient-to-r focus:from-green-500
    focus:bg-slate-500 focus:transition focus:duration-200 hover:from-green-500
     hover:bg-slate-500 hover:transition hover:duration-200  font-bold border-2 border-solid text-white py-3 px-4 rounded-full'>تسجيل الدخول</button>
    } 
  <div className='mb-3 clear-both'></div>

 
</form>

</div>
</section>
    </>
  )
}

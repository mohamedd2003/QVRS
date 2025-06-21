import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HeroSection from '../HeroSection/HeroSection'
import basmala from "../../assets/images/basmala.png"
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query'
import { Bars, Radio } from "react-loader-spinner"

export default function SurahDetails() {
  const getSurahVerse =()=>axios.get(`https://quranapi.pages.dev/api/${id}.json`)


  let {data,error,isLoading,isError}=useQuery({
      queryKey:['getSurahVerse'],
      queryFn:getSurahVerse,
      select:(data)=>data?.data,
      retry:Infinity,
      retryDelay:3000,
      staleTime:0,
      refetchOnWindowFocus:"always"
  })
    const {id}=useParams()
console.log(data);

    var[defaultTextSize,setDefaultTextSize]=useState(22)
let heroObj={
  title:data?.surahNameArabic,
  font:"surahName"
}
  
    

    const increaseTextSize=()=>{
    
      defaultTextSize=defaultTextSize+5
      setDefaultTextSize(defaultTextSize)
    }
    const decreaseTextSize=()=>{
      defaultTextSize=defaultTextSize-5
      setDefaultTextSize(defaultTextSize)
    }
if (isLoading)
{
  return (
    <div className="w-full bg-[rgba(0,0,0,0.4)] h-screen flex justify-center items-center">
    <Bars
  color='white'
  width="250"
  height='150'
  visible={true}
  ariaLabel="falling-circles-loading"
  />
    </div>
  );
}
    
  return (
    <>
    
    <HeroSection  obj={heroObj}>

   
    </HeroSection>  

    
    <section className='bg-[#fffbec]'>
  <div className='md:w-[80%] w-full m-auto py-10 '>
  <section id='detials' className='border-green-600 text-green-500  
  group border-double border-8 rounded-2xl noto md:leading-[30px]  hover:border-green-600   '>
<div className='my-8 md:my-5 flex items-center '>
 <h2 data-aos="fade-left" data-aos-duration="1000" data-aos-delay="50" className='bg-gradient-to-r  text-[18px] md:text-[32px] shadow-xl
  text-yellow-50  from-green-500 mx-5 to-slate-500 rounded-full inline p-2 ' > 
  <i className="fa-solid me-3 fa-circle-info"></i>معلومات حول  {data.surahNameArabicLong}</h2>

</div>
 <div className="border-b-2 border-green-600 mt-5 group-hover:border-green-600"></div>
 <div  className='flex items-center text-center flex-wrap my-5'>

 <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50" className='lg:w-4/12 w-full   hover:text-white
 my-2 hover:bg-gradient-to-r focus:from-green-500 text-[24px] md:text-[28px] focus:bg-slate-500 focus:transition focus:duration-200 hover:from-green-500
  hover:bg-slate-500 hover:transition hover:duration-200 
   py-2 hover:rounded-full'>
     <i className="fa-solid mx-1 fa-book-quran"></i>عدد آيات {data.surahNameArabicLong} : {data.totalAyah} آيات</h4>
 <h4 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="100" className='lg:w-4/12 text-[24px] md:text-[28px] hover:text-white
 w-full my-2 hover:bg-gradient-to-r focus:from-green-500
  focus:bg-slate-500 focus:transition focus:duration-200 hover:from-green-500 hover:bg-slate-500 hover:transition hover:duration-200  py-2 hover:rounded-full'><i className="fa-solid mx-1 fa-book-quran"></i>الأسم بالأنجليزي: {data.surahName}</h4>
 <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" className='lg:w-4/12 hover:text-white text-[24px] md:text-[28px] w-full my-2 hover:bg-gradient-to-r
  focus:from-green-500 focus:bg-slate-500 focus:transition focus:duration-200 hover:from-green-500
   hover:bg-slate-500 hover:transition hover:duration-200  py-2 hover:rounded-full'>
    <i className="fa-solid mx-1 fa-book-quran"></i> مكان النزول : {data.revelationPlace=="Madina"?"مدينه Madina" : "مكه Makka"}</h4>
 </div>
</section>
<div className="flex justify-center md:mt-5 mt-8 md:mb-5 mb-2  h-12 items-center">
<button onClick={()=>increaseTextSize()} className=' rounded-full bg-gradient-to-r  px-3 sm:px-6 ms-10 sm:ms-0 py-2   
 from-green-500 to-slate-500  '>  <i className="fa-solid fa-xl fa-magnifying-glass-plus"></i></button>
    <img  src={basmala}  className='w-[250px] bg-gradient-to-r
     from-green-500 mx-5 to-slate-500 my-4  rounded-full  h-10 bg-white-500 '/>
<button onClick={()=>decreaseTextSize()} 
className=' rounded-full bg-gradient-to-r   px-3 sm:px-6 py-2  
 from-green-500 to-slate-500 me-10 sm:me-0'>  <i className="fa-solid fa-xl fa-magnifying-glass-minus"></i></button>
</div>


<div className='   max-w-[150ch] pt-5'>
 {isLoading?<Radio
  visible={true}
  height="80"
  width="80"
  color="green"
  ariaLabel="radio-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />: data.arabic1?.map((ayah) => (
    <span  data-aos="fade-right" data-aos-duration="1000" data-aos-delay="50" key={uuidv4()}  
    style={{ fontSize: `${defaultTextSize}px` }}
    className={`
     text-green-500
      hover:bg-green-500
      leading-[41px]
      group
      hover:text-white hover:rounded-full 
       focus:bg-white focus:text-green-500 
      transition duration-200 ease-in-out
     ayah`}> 
    {ayah}<span className=' text-green-500 mx-1 group-hover:text-white text-[70px]' >۞</span>
    </span>
  ))}
  </div>
  </div>
    </section>
  
    </>
  
  )
}

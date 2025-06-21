import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import useSurahNames from '../../Hooks/useSurahNames';
export default function slider({lineStyle}) {
  
  let{data,isLoading,error}=useSurahNames()

  return (
    <>
    <section   >
        <div className="marquee noto ">
          <div className="marquee-content">
    {data?.slice().reverse().map((surahName)=> 
      <React.Fragment key={uuidv4()}>
     <i style={lineStyle} ></i>
      <span className='surahName'>{surahName.surahNameArabic}</span>
    </React.Fragment> 
     )}  
          </div>
        </div>

      </section>
    </>
  )
}

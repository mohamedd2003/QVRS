import React, { useMemo } from 'react'
import styles from "../HeroSection/Hero.module.css"
import { motion } from 'framer-motion'
import Marquee from "../Slider/Slider"

export default function HeroSection({obj}) {
  
 
  

 
  const lineStyle={
    background : 'linear-gradient(to right, #fff, #0d3d2f)',
    width: '80px',
    height: '5px',
    margin: '0 20px',
    marginRight: '40px',
    padding: '0px',
    display:' inline-block',
    transform: 'translateY(-20px)',
    borderRadius: '0',
       }
  return (
    <>
    
  <section className={ `    bg-no-repeat bg-[url('https://res.cloudinary.com/dnmwmrxmr/image/upload/f_auto,q_auto/cayzt5zecsl3r1ftojuq')]  bg-cover bg-center  ` }>
<div className=' bg-[rgba(0,0,0,0.3)]'>
<section id='hero'  className={ ` h-[88vh]  w-full  ` }>
      <div className='w-full flex justify-center items-center  h-[100%] '>
     
        <motion.h1 initial={{ x: 1500 }}
    animate={{ x: 0 }}
    transition={{ duration: 5 }} className={`${obj.font=="surahName"?"surahName text-[170px]":"noto md:text-[170px] text-[60px]"} font-bold   text-white`}>{obj.title}</motion.h1>
      
      </div>

   </section>
      <div className='   bottom-0   w-full    z-10 '> <Marquee lineStyle={lineStyle}/></div>
</div>
  </section>
    </>
    

  )
}

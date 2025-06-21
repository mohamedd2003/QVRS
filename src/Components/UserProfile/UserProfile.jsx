import React, { useEffect, useState } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import axios from 'axios'

export default function UserProfile() {
  const [userName, setUserName] = useState("");

  const fetchUserInfo = () => {
    fetch('https://vercel-api-deployment-iota.vercel.app/users/info', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        setUserName(data?.username); // Update the state with the username
        console.log(userName);
        
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  };

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  const heroObj = {
    title: `اهلا ${userName}`,
    font: ''
  };

  return (
    <>
       <HeroSection  obj={heroObj}/>

<section>
  <h2 className='md:text-7xl text-4xl text-center my-8 font-semibold ayah'><i className="fa-solid fa-clock-rotate-left fa-sm"></i> سجل القراءات</h2>
</section>

    </>
  )
}

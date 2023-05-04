import React, { useEffect, useState } from 'react'
import './Home.css'
import FeaturedInfo from '../../components/HomePageComponents/featuredInfo/FeaturedInfo'
import Chart from '../../components/HomePageComponents/chart/chart'
import WidgetSm from '../../components/HomePageComponents/widgetSm/widget'
import User from '../user/User'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import UserBarChart from '../../components/HomePageComponents/chart/userBarChart'

export default function Home(props) {

  let low=0,medium=0,high=0;
  const[res,setRes]=useState([]);
  const doctor = JSON.parse(window.sessionStorage.getItem('doctor_id'));
  let len = doctor.patients.length;
  let male=0,female=0;

  for (let i = 0; i < len; i++) {
    if(doctor.patients[i].severity <=27 )
    low++;
    else if(doctor.patients[i].severity <=44  )
    medium++;
    else
    high++;
    
}
for (let i = 0; i < len; i++) {
  if(doctor.patients[i].gender === 'M' )
  male++;
  else
  female++;
  
}

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user){
    const token = 'Bearer ' + user;
    config.headers.Authorization =  token;
  }
  return config;
});

  // console.log("doctor",doctor.patients);
  const Fetch_data = async()=>{
    
    await axios.get(` ${props.Api}doctor/visualise/${doctor.doctor_id}`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
        console.log(response.data);
        setRes(response.data);
        window.sessionStorage.setItem("DoctorInfo",JSON.stringify(response.data))
    })
    .catch(function(error)
    {
        console.log(error);
    });
    
}

useEffect(()=>{
    Fetch_data();
},[]);

  return (
    <div className='home'>
      <Navbar/>
        <User doctor={res} length={len} low={low} high={high} medium={medium} male={male} female={female}/>
        {/* <FeaturedInfo doctor={res} length={len} high={high}/> */}
        <h1 style={{marginLeft:"25px"}}>Analytics</h1>
          <Chart doctor={res.patients} low={low} high={high} medium={medium}/>
          {/* <Chart doctor={res.patients}/> */}
          <UserBarChart doctor={doctor.patients} low={low} high={high} medium={medium}/>
        <WidgetSm/>
        
        
    </div>
  )
}

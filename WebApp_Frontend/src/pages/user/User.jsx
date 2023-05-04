import React, { useEffect, useState } from 'react'
import './user.css'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
  import { Link } from "react-router-dom";
import Chart from '../../components/HomePageComponents/chart/chart';
import UserBarChart from '../../components/HomePageComponents/chart/userBarChart';
import FeaturedInfo from '../../components/HomePageComponents/featuredInfo/FeaturedInfo';


export default function User(props) {
  // console.log("props",props.doctor.firstname);
  const [doctor,setDoctor] =useState(props);
  console.log(props)
  useEffect(() => {
    // Update the document title using the browser API
    // setDoctor(props);
  });
  return (
    

    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Doctor's Info</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzBwqO0PFQthRjgimXInm0ILym0fmH0RXaJtDnpkMFoQ&usqp=CAU&ec=48665699"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Dr. {props.doctor.firstName} {props.doctor.lastName}</span>
              <span className="userShowUserTitle">{props.doctor.qualification}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{props.doctor.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{props.doctor.contact_number}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{props.doctor.firstName}@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">India</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Patient Statistics</span>
         
          {/* <Chart doctor={doctor.patients}/> */}
          {/* <UserBarChart doctor={doctor.patients} /> */}
          <FeaturedInfo doctor={props.doctor} length={props.length} high={props.high} male={props.male} female={props.female}/>
        </div>
      </div>
    </div>
    
  )
}

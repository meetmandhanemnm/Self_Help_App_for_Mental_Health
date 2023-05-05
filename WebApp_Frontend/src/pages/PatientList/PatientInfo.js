import "./PatientInfo.css";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Navbar from "../../components/Navbar";
// import ReviewsBar from "./Reviews/ReviewsBar";

// Example of a data array that
// you might receive from an API
const result = [
  { patient_id: 1, firstName: "John", age: 23, gender: "Male", contact_no: 123456789, status: 1, reviewScore:10},
  
];

export default function PatientInfo(props) {

  const navigate = useNavigate()
  const[res,setRes]=useState([]);
  // const[doctorData,setDoctorData] =useState();
  // let doctor = sessionStorage.getItem("doctor_id");
  const doctor = JSON.parse(window.sessionStorage.getItem('doctor_id'));
  // console.log("Doctor_id",doctor.doctor_id);

  axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
      const token = 'Bearer ' + user;
      config.headers.Authorization =  token;
    }
    return config;
  });


  const Fetch_data = async()=>{
    
    await axios.get(`${props.Api}doctor/patient/${doctor.doctor_id}`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
        console.log(response.data);
        setRes(response.data);
        window.sessionStorage.setItem("patient",JSON.stringify(response.data))
    })
    .catch(function(error)
    {
        console.log(error);
    });
    
}

useEffect(()=>{
    Fetch_data();
},[]);



  const handleRetrieve = (id, status) => {
    //It will go to next page and display the patient responses.
    
  };
// console.log(res)


  for (let i = 0; i < res.length; i++) {
    // console.log(res1[i].severity)
    console.log(res[i].severity)
    if(res[i].severity>=0 && res[i].severity<=27){
      res[i].severity='Low'
      
    }
    else if(res[i].severity>=28 && res[i].severity<=44){
      res[i].severity='Medium'
    }
    else if(res[i].severity>=45){
      res[i].severity='High'
    }
  //console.log(typeof(res[i].last_login)===string)
   if(res[i].last_login && res[i].last_login!=="Unknown" && typeof(res[i].last_login)===typeof('time')){
     let f=0
     var day=""
     var month=""
     var year=""
     var c = new Date(); 
     var s=(c.getMonth()+1)+"/"+c.getDate()+"/"+c.getFullYear()
    //  console.log(res[i].last_login)
   for(let j = 0; j < res[i].last_login.length; j++){
    //console.log(day,month,year,f)
    if(res[i].last_login[j]==='T'){
      break
    }
    if(res[i].last_login[j]==='-'){
        f=f+1
     }
  
     else if(f===0){
      year=year.concat(res[i].last_login[j])
    }
    else if(f===1){
      month =month.concat(res[i].last_login[j])
     }
   else if(f===2){
       day =day.concat(res[i].last_login[j])
     }
     
   }
  
  var d=month+"/"+day+"/"+year
  // console.log("date",d);
  
  const date1 = new Date(s);
  // console.log("date1",date1);
  const date2 = new Date(d);
  // console.log("date2",date2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  // // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");
  res[i].last_login=diffDays;
  // console.log("checking",res[i].last_login);
  }
  else if(res[i].last_login===null){
    res[i].last_login="Unknown"
  }
  
  
  }
  
  
  
  return (
    <>
    <div>
      <Navbar/>
      <h1>Hello,Dr {doctor.firstName} {doctor.lastName}</h1>
    </div>
      <div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
              <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                {/* <th>Age</th> */}
                <th>Gender</th>
                <th >Last_Active</th>
                <th>Severity</th>
                <th>Patient Response</th>
                <th>Patient workouts</th>
                <th>Chat</th>
              </tr>
            </thead>
            <tbody>
              {res.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.patient_id}</td>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    {/* <td>{val.age}</td> */}
                    <td>{val.gender}</td>
                    <td>{val.last_login+" days ago"}</td>
                    <td>{val.severity }</td>
                  
                    <td>
                      <Button
                        type="click"
                        variant="primary"
                        onClick={()=>navigate('patient_responses',{state: { patient_id:val.patient_id,firstName:val.firstName,gender:val.gender,remarks:val.remarks}})}>
                        
                        Retrieve
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="click"
                        variant="primary"
                       onClick={()=>navigate('patient_workout',{state: { patient_id:val.patient_id,firstName:val.firstName,gender:val.gender,remarks:val.remarks}})}>
                        Modify Workout
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="click"
                        variant="primary"
                       onClick={()=>navigate('patient_chat',{state: { patient_id:val.patient_id,firstName:val.firstName,gender:val.gender,remarks:val.remarks}})}>
                        Chat
                      </Button>
                    </td>
                  </tr> 
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
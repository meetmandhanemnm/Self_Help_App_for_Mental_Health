import React, { useEffect, useState } from 'react';
import "../PatientList/PatientInfo.css";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import AdminNavbar from './adminNavbar';



function Admin(props){
  let [res,setRes]=useState([]);


  // axios.interceptors.request.use( config => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  
  //   if(user){
  //     const token = 'Bearer ' + user;
  //     config.headers.Authorization =  token;
  //   }
  //   return config;
  // });
  
  
  const navigate = useNavigate()

  const Fetch_data = async()=>{
    await axios.get(`https://4ae2-103-156-19-229.ngrok-free.app/doctor/`, 
    
    {
     
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
        console.log(response.data);
        setRes(response.data);
        window.sessionStorage.setItem("Response",JSON.stringify(response.data))

        
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
    <>
    
    <AdminNavbar/>
    <div>
      <h1>Hello,Admin</h1>
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
                <th>Qualification</th>
              </tr>
            </thead>
            <tbody>
            {res.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.doctor_id}</td>
            <td>{val.firstName}</td>
            <td>{val.lastName}</td>
            {/* <td>{val.age}</td> */}
            <td>{val.qualification}</td>
          </tr> 
        );
      })}
            </tbody>
          </table>
          {/* <Button type="click"
            variant="primary"
            onClick={()=>navigate('admin_reg')}
            >
            Add Doctor
        </Button>
        <Button type="click"
            variant="primary"
            onClick={()=>navigate('patient_request',{state:{response:res}})}
            >
            See Patient Requests
        </Button> */}
        {/* <a href="#" onClick={this.showStudentList}>StudentList</a> */}
        </div>
      </div>
    </>
    );
}

export default Admin;
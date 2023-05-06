import React, { useEffect, useState } from 'react';
import "../PatientList/PatientInfo.css";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Swal from 'sweetalert2';

function Avail_doctors(props){

    let [res,setRes]=useState([]);

    const navigate = useNavigate()
    const {state} = useLocation();
  const {doctor_id,patient_id,arr} = state;

  axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
      const token = 'Bearer ' + user;
      config.headers.Authorization =  token;
    }
    return config;
  });


  const Fetch_data = async()=>{
  

    await axios.get(`${props.Api}doctor/`, 
    
    {
      mode:'cors',
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
        console.log(response.data);
        setRes(response.data);
        setRes((existingdoc)=>{
          return existingdoc.filter((item)=>item.doctor_id!=doctor_id);
          })
        setRes((existingdoc)=>{
            return existingdoc.filter((item)=>item.type!='C');
            })
            setRes((existingdoc)=>{
              return existingdoc.filter((item)=>item.type!='A');
              })
    })
    .catch(function(error)
    {
        console.log(error);
    });
    
}

  useEffect(()=>{
    Fetch_data();
},[]);


const onSelect = async (doctor_id,patient_id)=>{
  console.log(doctor_id,patient_id)

  await axios.put(`${props.Api}patient/doctor/${patient_id}`, {
    
    doctor_id : doctor_id
  })

  .then(function (response) {
    
    Swal.fire({
      icon: 'success',
      
      text: 'Doctor Assigned Successfully',
      footer: 'OK!!'
    });
    navigate("/admin/patient_request",{state:{response:arr}})

    //Reload on login
    // window.location.reload(true);
  })
  .catch(function (error) {
    Swal.fire({
      icon: 'error',
      
      text: 'Doctor assignment failed',
      footer: 'Failed!!'
    });
    console.log(error);
  }); 

  // navigate('patient_responses')

}


//console.log(doctor_id)


return (
    <>
    <div>
      <h1>List of Available Doctors</h1>
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
                <th>Number_Patients</th>
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
            <td>{val.patients.length}</td>

            <td>
                      <Button
                        type="click"
                        variant="primary"
                        onClick={()=>onSelect(val.doctor_id,patient_id)}
                        >
                        Select Doctor
                      </Button>
            </td>
          </tr> 
        );
      })}
            </tbody>
          </table>
        {/* <a href="#" onClick={this.showStudentList}>StudentList</a> */}
        </div>
      </div>
    </>
    );
}

export default Avail_doctors;
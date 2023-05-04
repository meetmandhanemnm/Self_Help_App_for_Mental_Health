import React, { useEffect, useState } from 'react';
import "../PatientList/PatientInfo.css";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate,  } from "react-router-dom";

function Avail_doctors(props){

    let [res,setRes]=useState([]);

    const navigate = useNavigate()
    const {state} = useLocation();
  const {doctor_id,patient_id,arr} = state;

  const Fetch_data = async()=>{
  

    await axios.get(`https://4ae2-103-156-19-229.ngrok-free.app/doctor/`, 
    
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

  await axios.put(`https://4ae2-103-156-19-229.ngrok-free.app/patient/doctor/${patient_id}`, {
    
    mode:'cors',
    doctor_id : doctor_id
  })

  .then(function (response) {
    
    alert("New doctor assigned successfully!!")
    navigate("/admin/patient_request",{state:{response:arr}})

    //Reload on login
    // window.location.reload(true);
  })
  .catch(function (error) {
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
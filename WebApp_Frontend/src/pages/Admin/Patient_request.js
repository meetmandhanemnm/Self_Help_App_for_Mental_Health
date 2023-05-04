import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../PatientList/PatientInfo.css";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate,  } from "react-router-dom";


function Patient_request(props){
  const navigate = useNavigate()
  var response = JSON.parse(window.sessionStorage.getItem('Response'))

  //let [res,setRes]=useState([{patient_id:1,firstName:"Raju",lastName:"Srivastav",Doc_id:7},{patient_id:5,firstName:"Vishal",lastName:"Singh",Doc_id:2},{patient_id:8,firstName:"Simha",lastName:"Nandagudi",Doc_id:11}]);
  let [res,setRes]=useState([]);

  axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
      const token = 'Bearer ' + user;
      config.headers.Authorization =  token;
    }
    return config;
  });

  


  const Fetch_data = async()=>{
    await axios.get(`${props.Api}patient/doctor`, 
    
    {
      mode:'cors',
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      
  })
    .then((response)=>{
        console.log(response.data);
        setRes(response.data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
    
}

  useEffect(()=>{
    Fetch_data();
},[]);

console.log(res)
console.log(typeof(response))


  const {state} = useLocation();
  // const {response} = state;

  for (let i = 0; i < res.length; i++) {

    for (let j = 0; j < response.length; j++) {
      if(response[j].doctor_id===res[i].patient.d_id){

        res[i].patient.doctorname=response[j].firstName +" " + response[j].lastName
        break
      }
    }
  }
 // console.log(res,response[1].firstName +" "+ response[1].lastName)
  


  //let res1=[{patient_id:1,firstName:"Raju",lastName:"Srivastav",Doc_id:5},{patient_id:5,firstName:"Vishal",lastName:"Singh",Doc_id:3},{patient_id:8,firstName:"Simha",lastName:"Nandagudi",Doc_id:11}]
  //setRes(res1)
  // console.log(res)
  // console.log(patient_id)

  

  // showStudentList = () => {
  //   this.setState({
  //     showTable: true,
  //   })
//   const navigate = useNavigate()

//   const Fetch_data = async()=>{
//     await axios.get(`${props.Api}doctor/`, 
    
//     {
//       mode:'cors',
//       headers: new Headers({
//         "ngrok-skip-browser-warning": "69420",
//       }),
      
//   })
//     .then((response)=>{
//         console.log(response.data);
//         setRes(response.data);
//     })
//     .catch(function(error)
//     {
//         console.log(error);
//     });
    
// }

//   useEffect(()=>{
//     Fetch_data();
// },[]);


  return (
    <>
    <div>
      <h1>Patient's Requests</h1>
    </div>
      <div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
              <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Doctor Name</th>
                <th>Remarks</th>
                <th>Requests</th>
              </tr>
            </thead>
            <tbody>
            {res.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.patient.patient_id}</td>
            <td>{val.patient.firstName}</td>
            <td>{val.patient.lastName}</td>
            {/* <td>{val.age}</td> */}
            <td>{val.patient.doctorname}</td>
            <td>{val.remark}</td>

            <td>
                      <Button
                        type="click"
                        variant="primary"
                        onClick={()=>navigate('avail_doctors',{state:{doctor_id:val.patient.d_id,patient_id:val.patient.patient_id,arr:response}})}
                        >
                        Change Doctor
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

export default Patient_request;
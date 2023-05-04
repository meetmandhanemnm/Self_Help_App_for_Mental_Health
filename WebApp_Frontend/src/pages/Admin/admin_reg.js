import React, { useEffect, useState } from 'react';
import "../PatientList/PatientInfo.css";
import axios from 'axios';
import { Link, useLocation, useNavigate,  } from "react-router-dom";



function Admin_reg(props){

  const [id, setId] = useState('');
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [qualification, setQualification] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // console.log(props.Api)
  async function save(event)
  {
      event.preventDefault();
  try
      {
       await axios.post(`https://4ae2-103-156-19-229.ngrok-free.app/doctor/`,
      {
      
      firstName: fname,
      lastName : lname,
      qualification : qualification,
      email:email,
      type:'D',
      username:username,
      password: password         
      
      });
        alert("Employee Registation Successfully");
        navigate('/admin')
        // setId("");
        // setName("");
        // setAddress("");
        // setMobile("");
      
      
      }
  catch(err)
      {
        alert("User Registation Failed");
      }
 }


 


return(
<>
<h1 style={{textAlign:"center"}}>Doctor Registration</h1>
<div className="container mt-4">
  
<form>
        <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="Enter First Name"
             value={fname}
            onChange={(event) =>
              {
                setFName(event.target.value);      
              }}
            />
        </div>

        <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="Enter Last Name"
             value={lname}
             onChange={(event) =>
               {
                setLName(event.target.value);      
               }}
            />
        </div>

        <div className="form-group">
            <label>Qualification</label>
            <input type="text" className="form-control" placeholder="Enter Qualification"
            value={qualification}
            onChange={(event) =>
              {
                setQualification(event.target.value);      
              }}
           />
        </div>

        <div className="form-group">
            <label>Email-id</label>
            <input type="text" className="form-control" placeholder="Enter Email-id"
            value={email}
            onChange={(event) =>
              {
                setEmail(event.target.value);      
              }}
           />
        </div>

        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter Username"
            value={username}
            onChange={(event) =>
              {
                setUsername(event.target.value);      
              }}
           />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter Password"
            value={password}
            onChange={(event) =>
              {
                setPassword(event.target.value);      
              }}
           />
        </div>

        <button className="btn btn-primary mt-4 "  onClick={save} >Register</button>

        </form>



</div>

</>
);
    
      
    
  }
  
  export default Admin_reg;
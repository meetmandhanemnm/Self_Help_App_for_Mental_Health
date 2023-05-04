import React, { useEffect, useState } from 'react';
import "../../pages/PatientList/PatientInfo.css";
import axios from 'axios';
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import { Alert } from 'reactstrap';
import Swal from 'sweetalert2';




function ChangePassword(props){


    axios.interceptors.request.use( config => {
        const user = JSON.parse(localStorage.getItem('user'));
      
        if(user){
          const token = 'Bearer ' + user;
          config.headers.Authorization =  token;
        }
        return config;
      });

  // const [email, setEmail] = useState("");
  const [oldp, setOld] = useState("");
  const [newp, setNew] = useState("");

  const navigate = useNavigate();

  // console.log(props.Api)
  const doctor_id=window.sessionStorage.getItem("id");
  // console.log("doctor_id",doctor_id);
  // console.log("doctor_id",doctor_id);
  async function save(event)
  {
      event.preventDefault();
  // try
  //     {
  //      await axios.post(`https://4ae2-103-156-19-229.ngrok-free.app/doctor/Password `
  //    );
  //       alert("Password changed Successfully!!..Please directing you to login page");
  //       navigate('/')
  //       // navigate('/admin')
  //       // setId("");
  //       // setName("");
  //       // setAddress("");
  //       // setMobile("");
      
      
  //     }
  // catch(err)
  //     {
  //       alert("User Registation Failed");
  //     }
  await axios.post(`${props.Api}doctor/Password`, {
    
  doctor_id : doctor_id,
  password : newp
}).then(Swal.fire({
  icon: 'success',
  
  text: 'Password Changed Successfully',
  footer: 'OK!!'
}),

        navigate('/'),
)
 }

 

return(
<>
<div class="container mt-4">
<form>

{/* <div class="form-group">
            <label>Email-id</label>
            <input type="text" class="form-control" placeholder="Enter Email-id"
            value={email}
            onChange={(event) =>
              {
                setEmail(event.target.value);      
              }}
           />
        </div>
     */}
        <div class="form-group">
            <label>Old Password</label>
            <input type="password" class="form-control" placeholder="Enter your old password"
            value={oldp}
            onChange={(event) =>
              {
                setOld(event.target.value);      
              }}
           />
        </div>

        <div class="form-group">
            <label>New Password</label>
            <input type="password" class="form-control" placeholder="Enter your new password"
            value={newp}
            onChange={(event) =>
              {
                setNew(event.target.value);      
              }}
           />
        </div>
        
        <button class="btn btn-primary mt-4"  onClick={save} >Submit</button>
        </form>


</div>

</>
);
    
      
    
  }
  
  export default ChangePassword;
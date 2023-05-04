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

  const [formErrors, setFormErrors] = useState({});


  const navigate = useNavigate();

  const doctor_id=window.sessionStorage.getItem("id");

  const validateForm = () => {
    let errors = {};
    if (!oldp) {
      errors.oldp = '*Old Password is required'
    }
    if (!newp) {
      errors.newp = '*New Password is required';
    }
    
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  
  async function save(event)
  {
      event.preventDefault();
  if(validateForm()){
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
 }

 

return(
<>
<div class="container mt-4">
<form onSubmit={save}>

        <div class="form-group">
            <label>Old Password</label>
            <input type="password" class="form-control" placeholder="Enter your old password"
            value={oldp}
            onChange={(event) =>
              {
                setOld(event.target.value);      
              }}
           />
        {formErrors.oldp && <span style={{color:"red",fontSize:15}}>{formErrors.oldp}</span>}

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
    {formErrors.newp && <span style={{color:"red",fontSize:15}}>{formErrors.newp}</span>}
        </div>
        
        <button class="btn btn-primary mt-4"  type='submit' >Submit</button>
        </form>


</div>

</>
);
    
      
    
  }
  
  export default ChangePassword;
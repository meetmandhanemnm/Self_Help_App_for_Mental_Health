import React, { useEffect, useState } from 'react';
import "../../pages/PatientList/PatientInfo.css";
import axios from 'axios';
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Swal from 'sweetalert2';
import ReactLoading from "react-loading";




function ForgotPassword(props){

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] =useState(false);

  const [formErrors, setFormErrors] = useState({});


  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!email) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '*Email is invalid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  
  async function save(event)
  {
      event.preventDefault();

if (validateForm()){
      setIsLoading(true);
  
  try {
    const { data } = await axios({
        method: 'post',
        url: `${props.Api}doctor/resetPassword/${email}`,
        data: {
          email:email 
        }
    });
    setIsLoading(false);
    
    Swal.fire({
      icon: 'success',
      
      text: 'Mail sent Successfully',
      footer: 'OK!!'
    })
    console.log(data);
} catch (err) {
  setIsLoading(false);
    if (err.response.status === 404) {
      Swal.fire({
        icon: 'error',
        
        text: '404 Please try again...',
        footer: 'Not OK!!'
      })
        console.log('Resource could not be found!');
    } else {
      Swal.fire({
        icon: 'error',
        
        text: 'Please try again...',
        footer: 'Not OK!!'
      })
        console.log(err.message);
    }
}
}
 }


 


return(!isLoading)?(
<>
<h1 style={{textAlign:'center'}}>Forgot Password!!!</h1>
<div className="container mt-4">
<form onSubmit={save}>
        <div className="form-group">
            <label>Email-id</label>
            <input type="text" className="form-control" placeholder="Enter Email-id"
            value={email}
            onChange={(event) =>
              {
                setEmail(event.target.value);      
              }}
           />
      {formErrors.email && <span style={{color:"red",fontSize:15}}>{formErrors.email}</span>}
        </div>
        
        <button className="btn btn-primary mt-4"  type="submit" >Send Mail</button>
        </form>


</div>

</>
):
(
  <ReactLoading
    type="bubbles"
    color="#0000FF"
    height={200}
    width={200}
    className="loader"
  />
)
    
      
    
  }
  
  export default ForgotPassword;
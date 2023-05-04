import React, { useEffect, useState } from 'react';
import "../../pages/PatientList/PatientInfo.css";
import axios from 'axios';
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Swal from 'sweetalert2';
import ReactLoading from "react-loading";




function ForgotPassword(props){

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] =useState(false);

  const navigate = useNavigate();


  
  async function save(event)
  {
      event.preventDefault();
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
    if (err.response.status === 404) {
      Swal.fire({
        icon: 'error',
        
        text: '404 Please try again...',
        footer: 'OK!!'
      })
        console.log('Resource could not be found!');
    } else {
      Swal.fire({
        icon: 'error',
        
        text: 'Please try again...',
        footer: 'OK!!'
      })
        console.log(err.message);
    }
}
 }


 


return(!isLoading)?(
<>
<h1 style={{textAlign:'center'}}>Forgot Password!!!</h1>
<div className="container mt-4">
<form>
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
        
        <button className="btn btn-primary mt-4"  onClick={save} >Send Mail</button>
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
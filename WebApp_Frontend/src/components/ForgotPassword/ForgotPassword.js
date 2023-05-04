import React, { useEffect, useState } from 'react';
import "../../pages/PatientList/PatientInfo.css";
import axios from 'axios';
import { Link, useLocation, useNavigate,  } from "react-router-dom";



function ForgotPassword(props){

  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  
  async function save(event)
  {
      event.preventDefault();
  // try
  //     {
  //      await axios.put(`https://4ae2-103-156-19-229.ngrok-free.app/patient/resetPassword/${email}`,
  //     {
      
  //     email:email     
      
  //     });
  //       alert("Email sent Successfully");
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

  try {
    const { data } = await axios({
        method: 'post',
        url: `https://4ae2-103-156-19-229.ngrok-free.app/doctor/resetPassword/${email}`,
        data: {
          email:email 
        }
    });

    console.log(data);
} catch (err) {
    if (err.response.status === 404) {
        console.log('Resource could not be found!');
    } else {
        console.log(err.message);
    }
}
 }


 


return(
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
);
    
      
    
  }
  
  export default ForgotPassword;
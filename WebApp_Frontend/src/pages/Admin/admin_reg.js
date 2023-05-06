import React, { useEffect, useState } from 'react';
import "../PatientList/PatientInfo.css";
import axios from 'axios';
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Swal from 'sweetalert2';
import ReactLoading from "react-loading";




function Admin_reg(props){

  const [id, setId] = useState('');
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [qualification, setQualification] = useState("");
  const [isLoading, setIsLoading] =useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



const [formErrors, setFormErrors] = useState({});
{/* <h1 style={{ color: 'red' }}>Hello world</h1> */}

const validateForm = () => {
  let errors = {};
  if (!fname) {
    errors.fname = '*FirstName is required'
  }
  if (!lname) {
    errors.lname = '*LastName is required';
  }
  if (!qualification) {
    errors.qualification = '*Qualification is required';
  }
  if (!email) {
    errors.email = '*Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = '*Email is invalid';
  }
  if (!username) {
    errors.username = '*Username is required';
  } 


  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};

  // const handleLoading = () => {
  //   setIsLoading(false);
  // //   window.location.reload();  
  //   }
  // console.log(props.Api)
  async function save(event)
  {
      event.preventDefault();

if (validateForm()){
      setIsLoading(true);

  try
      {
       await axios.post(`${props.Api}admin/register/doctor/`,
      {
      
      firstName: fname,
      lastName : lname,
      qualification : qualification,
      email:email,
      type:'D',
      username:username,
      // password:123
      });
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        
        text: 'Doctor Added Successfully',
        footer: 'OK!!'
      })
        navigate('/admin')
        // setId("");
        // setName("");
        // setAddress("");
        // setMobile("");
      
      
      }
  catch(err)
      {
        setIsLoading(false);

        Swal.fire({
          icon: 'error',
          
          text: 'Doctor Not Added',
          footer: 'Please try again.'
        })
      }
    }
 }


//  useEffect(()=>{
//   window.addEventListener("load",handleLoading);
//   save();
//   return () => window.removeEventListener("load",handleLoading);
  
//   },[])


// const handleSubmit = (event) => {
//   event.preventDefault();
//   if (validateForm()) {
    
//     console.log(formData);
//   }
// };


return(!isLoading)?(
<>
<h1 style={{textAlign:"center"}}>Doctor Registration</h1>
<div className="container mt-4">
  
<form onSubmit={save}>
        <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="Enter First Name"
             value={fname}
            onChange={(event) =>
              {
                setFName(event.target.value);      
              }}
            />
            {formErrors.fname && <span style={{color:"red",fontSize:15}}>{formErrors.fname}</span>}
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
            {formErrors.lname && <span style={{color:"red",fontSize:15}}>{formErrors.lname}</span>}
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
           {formErrors.qualification && <span style={{color:"red",fontSize:15}}>{formErrors.qualification}</span>}
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
           {formErrors.email && <span style={{color:"red",fontSize:15}}>{formErrors.email}</span>}
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
           {formErrors.username && <span style={{color:"red",fontSize:15}}>{formErrors.username}</span>}
        </div>


        <button className="btn btn-primary mt-4 " type="submit" >Register</button>

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
);
    
      
    
  }
  
  export default Admin_reg;
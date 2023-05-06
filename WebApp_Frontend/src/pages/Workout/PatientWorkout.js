import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DoctorCard from "../../components/Cards/DoctorCard";
import NonDoctorCard from "../../components/Cards/NonDoctorCard";
import { WindowSharp } from "@mui/icons-material";
import Swal from 'sweetalert2';


const PatientWorkout = (props) => {
  const { state } = useLocation();
  const { patient_id, firstName, gender, remarks } = state;
  const [taskList, setTaskList] = useState([]);
  const [taskListT, setTaskTList] = useState([]);
  const [taskListF, setTaskFList] = useState([]);
  const [taskListM, setTaskMList] = useState([]);
  const [NontaskList, setNonTaskList] = useState([]);
  const [pre_id,setPre_Id] = useState();
  const [UpdatedList, setUpdatedList] = useState([]);

  let a=JSON.parse(localStorage.getItem("user"))
  axios.interceptors.request.use( 
    async config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
      const token = 'Bearer ' + user;
      config.headers.Authorization =  token;
    }
    return config;
  },
  
  error=>{
    Promise.reject(error)
  });


  const Fetch_data = async () => {
    //let a=JSON.parse(localStorage.getItem("user"))
    // console.log(a)
    
      await axios.get(`${props.Api}patient/workout/${patient_id}`, 
    
    {
      mode:'cors',
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
        
      }),
      
  })

  .then((response)=>{
    // console.log( response.token)
    // localStorage.setItem("user", response.token);
    // localStorage.setItem("refreshToken", response.refresh_token);
    //console.log(response.data);
    setTaskList(response.data);
})
.catch(function(error)
{
    console.log(error);
});
  
// await delay(5000);

await axios.get(`${props.Api}doctor/workout/${patient_id}`, 
    
     {
       mode:'cors',
       headers: new Headers({
         "ngrok-skip-browser-warning": "69420",
       }),
      
   })

   .then((response)=>{
     console.log(response.data);
     setNonTaskList(response.data);
 })
 .catch(function(error)
 {
     console.log(error);
 });

  };
 

  const handleAdd = async () =>{
    let f=0
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].workout_instance_id==pre_id && taskList[i].completed==false){
        f=1
        break
      }
    }

    if(f==1){
    try{
      console.log("pre_id",pre_id);
      const response =await  fetch(`${props.Api}doctor/workout/${patient_id}/${pre_id}`, {
        
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + `${a}`
        },
        body: JSON.stringify(UpdatedList),
              
      })
        // .then((res) => res.json())
        // .then((res) => console.log("Response",res));
        window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }
  else if(f==0){
    Swal.fire({
      icon: 'error',
      
      text: 'Workout already completed by patient..Please select some different pre-requisite',
      footer: 'Try again !!'
    })
  }   
  };
  const SendNotification = async () => {
    fetch("https://app.nativenotify.com/api/indie/notification", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      subID:"70" ,
      appId: "7695",
      appToken: "wDN7Drh1sdRsg6rE11FAVz",
      title: "Workouts Added",
      message: "Check it Out!!"
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    // console.log("Notification");
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));
  }

  useEffect(() => {
    // let arr =localStorage.getItem("taskList")
    Fetch_data();
    // Fetch_data2();

    if (taskList) {
      let obj = taskList;
      setTaskList(obj);
    }

    if (NontaskList) {
      let obj2 = NontaskList;
      setTaskList(obj2);
    }
  }, []);

  const saveTask = (taskObj) => {
    let tempList = UpdatedList;
    tempList.push(taskObj);
    // setUpdatedList([...UpdatedList,{workoutList:{'workout_id':taskObj.workout_id,'title':taskObj.title,'description':taskObj.description}}])

    localStorage.setItem("taskList", tempList);
    setUpdatedList(UpdatedList);
    console.log("Updated Task", UpdatedList);
  };

  useEffect(() => {
    setTaskFList(taskList.filter((task)=>task.completed===false))
    setTaskTList(taskList.filter((task)=>task.completed===true))
    
  },[taskList]
  );

  useEffect(()=>{
    setTaskMList([...taskListF,...taskListT])
      },[taskListF,taskListT]);

  // console.log("updatedList",typeof(UpdatedList));
  return (
    <>
      <div className="patient_details">
        <h3
          className="heading"
          style={{
            color: "red",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          Instructions for Allocating Activities
        </h3>
        <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
          1. Left side indicates "alloted Activities" which you have already
          alloted to patient(Red: Pending workout , Green: Completed Workout).
        </p>
        <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
          2. Right side indicates "Non-alloted Activities" which you can
          allocate to a patient.
        </p>
        <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
          3. While allocating activities you have to take care of pre-requisites
          tasks, you should allot only those activites whose pre-requisite has
          already been alloted.
        </p>
      </div>

      <div className="content-container">
        <h3 className="heading">Alloted Activities</h3>
        <div>
          {taskListM &&
            taskListM.map((obj, index) => (
              <DoctorCard taskObj={obj} index={index} />
            ))}
        </div>
      </div>

      <div className="non-allocated">
        <h3 className="heading">Non-Alloted Activities</h3>
        <input
          onChange={(e) => setPre_Id(e.target.value)}
          required
          type="text"
          placeholder="Pre-Requisite"
          // value={this.state.value}
          // onChange={this.handleChange}
        />
        <button onClick={handleAdd} className="btn btn-primary">
          ADD
        </button>
        {/* <button onClick={SendNotification} className="btn btn-primary">
          Send Notifications
        </button> */}
        <div>
          {NontaskList &&
            NontaskList.map((obj2, index) => (
              <NonDoctorCard taskObj={obj2} index={index} save={saveTask} />
            ))}
        </div>
      </div>
    </>
  );
};

export default PatientWorkout;

import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DoctorCard from "./DoctorCard";
import NonDoctorCard from "./NonDoctorCard";

const PatientWorkout = (props) => {
  const { state } = useLocation();
  const { patient_id, firstName, gender, remarks } = state;
  const [taskList, setTaskList] = useState();
  const [NontaskList, setNonTaskList] = useState();
  const [pre_id,setPre_Id] = useState();
  const [UpdatedList, setUpdatedList] = useState([]);

  const Fetch_data = async () => {
    try {
      const response = await fetch(
        ` https://d8eb-119-161-98-68.in.ngrok.io/patient/workout/${patient_id}`
      );
      const data = await response.json();
      setTaskList(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Fetch_data2 = async () => {
    try {
      const response = await fetch(
        ` https://d8eb-119-161-98-68.in.ngrok.io/doctor/workout/${patient_id}`
      );
      const data = await response.json();
      setNonTaskList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
 

  const handleAdd = async () =>{
    try{
      console.log("pre_id",pre_id);
      const response =await  fetch(`https://d8eb-119-161-98-68.in.ngrok.io/doctor/workout/${patient_id}/${pre_id}`, {
        
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
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
    
    
  };

  useEffect(() => {
    // let arr =localStorage.getItem("taskList")
    Fetch_data();
    Fetch_data2();

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

  // console.log("updatedList",typeof(UpdatedList));


  

  return (
    <>
      <div className="patient_details">
        <h3 className="heading" style={{color:"red",fontStyle:"italic",textDecoration:"underline"}}>Instructions for Allocating Activities</h3>
        <p style={{color:"red",fontStyle:"italic",fontWeight:"bold"}}>1. Left side indicates "alloted Activities" which you have already alloted to patient.</p>
        <p style={{color:"red",fontStyle:"italic",fontWeight:"bold"}}>2. Right side indicates "Non-alloted Activities" which you can allocate to a patient.</p>
        <p style={{color:"red",fontStyle:"italic",fontWeight:"bold"}}>3. While allocating activities you have to take care of pre-requisites tasks, you should allot only those activites whose pre-requisite has already been alloted.</p>
      </div>

      <div className="content-container">
        <h3 className="heading" >alloted Activities</h3>
        <div>
          {taskList &&
            taskList.map((obj, index) => (
              <DoctorCard taskObj={obj} index={index} />
            ))}
        </div>
      </div>

      <div className="non-allocated">
        <h3 className="heading">Non-alloted Activities</h3>
        <input
            onChange={(e)=>setPre_Id(e.target.value)}
            
            required
            type="text"
            placeholder="Pre-Requisite"
            // value={this.state.value}
            // onChange={this.handleChange}
          />
          <button>Submit</button>
        <div>
          {NontaskList &&
            NontaskList.map((obj2, index) => (
              <NonDoctorCard taskObj={obj2} index={index} save={saveTask} />
            ))}
        </div>
        <button onClick={handleAdd} className="btn btn-primary">
          ADD
        </button>
      </div>
    </>
  );
};

export default PatientWorkout;

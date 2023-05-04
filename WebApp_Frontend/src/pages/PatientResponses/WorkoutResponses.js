import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useLocation, useNavigate } from "react-router-dom";

const WorkoutResponse = (props) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate= useNavigate();
  const {state} = useLocation();
  const { workout_instance_id} = state;
  let a=JSON.parse(localStorage.getItem("user"))
  const handleLoading = () => {
  setIsLoading(false);
//   window.location.reload();  
  }

  // const workout_instance = window.sessionStorage.getItem("workout-instance_id");
  console.log(workout_instance_id);
  

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `${props.Api}doctor/workoutResponses/${workout_instance_id}`,{
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + `${a}`
        }

    });
      const data = await response.json();
      setResponse(data);

      console.log(data);
        if(data.length !== 0)
        {
          setIsLoading(false);
        }
        else if(data.length === 0)
        {
          console.log("No Data")
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    window.addEventListener("load",handleLoading);
    fetchTodos();
    return () => window.removeEventListener("load",handleLoading);
    
    },[])

  return (!isLoading) ? (
    <>
    <div>
        <h1 className="workout_heading" style={{textDecoration:"underline"}}>Patient Workout Responses:</h1>
        
    <ul className="Workout_Responses">
  {response.map((res) => (
    <li key={res.id}>
   <p style={{fontWeight:"bold",fontSize:"20px"}}>{res.workout_question.question}</p>
    <p>Ans: {res.response}</p>
    
    </li>
  ))}
  </ul>

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
};

export default WorkoutResponse;

import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactLoading from "react-loading";


export default function Responses() {
    const [isLoading, setIsLoading] = React.useState(true);
    const patient = JSON.parse(window.sessionStorage.getItem('patient'));
    const handleLoading = () => {
    setIsLoading(false);
    }

    
    useEffect(()=>{
    window.addEventListener("load",handleLoading);
    return () => window.removeEventListener("load",handleLoading);
    },[])
    
  const [data, setTodos] = React.useState([]);
  const {state} = useLocation();
  const { patient_id,firstName,gender,remarks} = state; // Read values passed on state
   
  // https://d1da-119-161-98-68.in.ngrok.io/patient/responses/${patient_id}
  // http://localhost:8080/patient/responses/2
  const fetchTodos = async () => {
    try {
        console.log("I",patient_id)
      const response = await fetch(` https://4ae2-103-156-19-229.ngrok-free.app/patient/responses/${patient_id}`);
      const data = await response.json();
      setTodos(data);

      console.log(data);
      if(data.length !== 0)
      {
        setIsLoading(false);
      }
      
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  
  

  return (!isLoading) ? (
    <>
      <div>
        <h2 style={{fontWeight:"bold"}}>Patient Details:-</h2>
      <p>Name: {firstName}</p>
        <p>Gender: {gender}</p>
        <p>Remarks: {remarks}</p>
      </div>

      <h3 className="hero--header">Patient's Responses to Questionnaire</h3>
      {/* <p className="hero--text">Below are Responses of <b>{data[0].name}</b> with <b>patient_id--{data[0].p_id}</b>.</p> */}
      <h>
        Q{data[0].question.qid}-{data[0].question.description}
      </h>
      <ul>
        <li>{data[0].answer}</li>
      </ul>

      <h>
        Q{data[1].question.qid}-{data[1].question.description}
      </h>
      <ul>
        <li>{data[1].answer}</li>
      </ul>

      <h>
        Q{data[2].question.qid}-{data[2].question.description}
      </h>
      <ul>
        <li>{data[2].answer}</li>
      </ul>

      <h>
        Q{data[3].question.qid}-{data[3].question.description}
      </h>
      <ul>
        <li>{data[3].answer}</li>
      </ul>

      <h>
        Q{data[4].question.qid}-{data[4].question.description}
      </h>
      <ul>
        <li>{data[4].answer}</li>
      </ul>
    </>
  ) : (
    <ReactLoading
      type="bubbles"
      color="#0000FF"
      height={200}
      width={200}
      className="loader"
    />
  );
}

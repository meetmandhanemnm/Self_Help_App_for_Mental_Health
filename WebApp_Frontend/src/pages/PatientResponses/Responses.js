import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import './Response.css';


export default function Responses(props) {
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
        // console.log("I",patient_id)
        let a=JSON.parse(localStorage.getItem("user"))
      const response = await fetch(` ${props.Api}patient/responses/${patient_id}`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
          "Authorization":`Bearer ${a}`
        }),
      }
      
      );
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
    <div class="faq-container">
        <h2 style={{fontWeight:"bold"}}>Patient Details:-</h2>
      <p>Name: {firstName}</p>
        <p>Gender: {gender}</p>
      </div>
  <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
          NOTE: Answers to the questionnaire are in the scale of (1-5).
  </p>
  <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
      Rating 1: Low
  </p>
  <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
      Rating 3: Average
  </p>
  <p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>
      Rating 5: High 
  </p>
  <div class="faq-container">
  <h2 style={{ textDecoration: 'underline black'}}>Patient's Responses to Questionnaire</h2>
  <ul class="faq-list">
    <li>
      <h3>Q{data[0].question.qid}-{data[0].question.description}</h3>
      <p>Rate: {data[0].answer}</p>
    </li>
    <li>
    <h3>Q{data[1].question.qid}-{data[1].question.description}</h3>
      <p>Rate: {data[1].answer}</p>
    </li>
    <li>
    <h3>Q{data[2].question.qid}-{data[2].question.description}</h3>
      <p>Rate: {data[2].answer}</p>
    </li>
    <li>
    <h3>Q{data[3].question.qid}-{data[3].question.description}</h3>
      <p>Rate: {data[3].answer}</p>
    </li>
    <li>
    <h3>Q{data[4].question.qid}-{data[4].question.description}</h3>
      <p>Rate: {data[4].answer}</p>
    </li>
  </ul>
</div>

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

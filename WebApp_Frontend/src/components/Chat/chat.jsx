import React, { useEffect, useState } from 'react'
import Cam from'../images/Cam.png';
import Add from '../images/Add.jpg';
import More from '../images/More.png';
import Messages from './Messages';
import Input from './Input';
import CryptoJS from 'crypto-js';

import "./chat_style.css";
import { useLocation } from 'react-router-dom';

const Chat = () => {
    const {state} = useLocation();
    const { patient_id,firstName,gender,remarks} = state; 
    const [patientID,setPatientID] =useState();
   console.log("patient-id",patient_id);

    const storePatientID = () =>{
        
    }
    useEffect(() => {
        storePatientID();

      
      }, []);
  return (
    <div className='application'>
        <div className='con'>
        <div className='chat'>
            <div className='chatInfo'>
                <span>Chat</span>
                <div className='chatIcons'>
                    <img src={Cam} alt=""/>
                    <img src={Add} alt=""/>
                    <img src={More} alt=""/>
                </div>
            </div>
            
            <Messages patient_id={patient_id} />
            <Input patient_id={patient_id}/>
        </div>
        </div>
        </div>
  )
}

export default Chat
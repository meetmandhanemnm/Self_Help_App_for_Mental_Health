import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { v4 as uuid } from "uuid";
import firebase from "../../config"
import "./chat_style.css";
import Lock from '../images/lock.png'
export default function Messages(props) {

  
  const doctor = JSON.parse(window.sessionStorage.getItem('doctor_id'));
  const sender = `${doctor.doctor_id}`;
  const reciever = `${props.patient_id}`;

  // const sender = `15`;
  // const reciever = `70`;
  // console.log("props",props.patient_id)
  const collection_id = `D${sender}P${reciever}`;
  console.log("collection_id",collection_id)
  const [messages, setMessages] = useState([]);
  const [key, setKey] = useState("12345");
  const [Sendingmessage, setSendingMessage] = useState();
  const unique_id = uuid();


  const renderMessages = () => {
    return messages.map((message, index) => {
      const messageClass =
        message.senderID[0] === "D" ? "doctorMessage" : "patientMessage";
      //   const style = message.senderID === 'D15' ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' };
      return (
        <div className="message">
          

          <div className="messageContent">
            <div key={index} className={messageClass}>
              {message.senderID}: {message.text}
            </div>
            {/* <img className="msgContent_avatar" src={Avatar} alt=" " /> */}

          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    console.log("Chat Room ID : ", collection_id);
    const querySnapshot = firebase
      .firestore()
      .collection(collection_id)
      .orderBy("createdAt");
    querySnapshot.onSnapshot((snapShot) => {
      const allMessages = snapShot.docs.map((snap) => {
        // Decrypt message before rendering
        // const bytes = CryptoJS.AES.decrypt(snap.data().text, key);
        // const text = bytes.toString(CryptoJS.enc.Utf8);
        const text = CryptoJS.AES.decrypt(snap.data().text, "12345").toString(
          CryptoJS.enc.Utf8
        );

        return {
          ...snap.data(),
          createdAt: new Date(),
          text: text,
        };
      });
      setMessages(allMessages);

      console.log(allMessages);
    });
  }, []);

  return (
    <div className="messages">
      <div style={{textAlign:'center' ,fontWeight:"bold"}}>
      end-to-end-encrypted
      <img src={Lock} alt=""/>
      </div>
      

      <div>{renderMessages()}</div>
    </div>
  );
}

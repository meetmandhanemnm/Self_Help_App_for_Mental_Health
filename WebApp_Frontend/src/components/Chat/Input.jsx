import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import firebase from "../../config";
import CryptoJS from 'crypto-js';
import "./chat_style.css";
export default function Input(props) {
  const [Sendingmessage, setSendingMessage] = useState();
  
  

  const doctor = JSON.parse(window.sessionStorage.getItem('doctor_id'));
  const sender = `${doctor.doctor_id}`;
  const reciever = `${props.patient_id}`;
  // const collection_id = `D15P70`;
  const collection_id = `D${sender}P${reciever}`;

// Encryption

const secretKey = '12345';
// const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();

// Decryption
// const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
// const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

  const sendMessage = () => {
    //Encrypting message before sending
    const encryptedMessage = CryptoJS.AES.encrypt(Sendingmessage, secretKey).toString();

    console.log(uuid);
    const msg = {
      _id: uuid(),
      text: encryptedMessage,
      senderID: `D${sender}`,
      recieverID: `P${reciever}`,
      user: { _id: sender },
    };
    firebase
      .firestore()
      .collection(collection_id)
      .add({
        ...msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setSendingMessage('');
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setSendingMessage(e.target.value)}
        value={Sendingmessage}
      />
      <div className="send">
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

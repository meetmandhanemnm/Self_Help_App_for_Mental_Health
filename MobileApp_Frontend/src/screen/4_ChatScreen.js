// import React from "react";
// import { View } from "react-native";
// import { Text } from "react-native-elements";

// const ChatScreen = () => {
//   return (
//     <View>
//       <Text h2>This is Chat Screen</Text>
//     </View>
//   );
// };

// // export default ChatScreen;
// import React, { useState, useEffect } from "react";
// import { View } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// // import firestore from "@react-native-firebase/firestore";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// //import { useRoute } from "@react-navigation/native";
// const Example = () => {
//   const [messages, setMessages] = useState([]);
//   // const route = useRoute();

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello developer",
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: "React Native",
//           avatar: "https://placeimg.com/140/140/any",
//         },
//       },
//     ]);
//   }, []);

//   const onSend = (messageArray) => {
//     console.log(messageArray);
//     const msg = messageArray[0];
//     const myMsg = { ...msg, senderId: 1, receiverId: 2 };
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, myMsg)
//     );
//     getFirestore()
//       .collection("chats")
//       .doc(2)
//       .collection("messages")
//       .add({ ...myMsg, createdAt: new Date() });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 2,
//         }}
//       />
//     </View>
//   );
// };
// Example.navigationOptions = () => {
//   return {
//     headerShown: false,
//   };
// };
// export default Example;

// // import React, { useState, useCallback, useEffect } from "react";
// // import { GiftedChat } from "react-native-gifted-chat";
// // import { View, Text } from "react-native";
// // const FireBaseChat = () => {
// //   const [messages, setMessages] = useState([]);

// //   useEffect(() => {
// //     setMessages([
// //       {
// //         _id: 1,
// //         text: "Hello developer",
// //         createdAt: new Date(),
// //         user: {
// //           _id: 2,
// //           name: "React Native",
// //           avatar: "https://placeimg.com/140/140/any",
// //         },
// //       },
// //     ]);
// //   }, []);

// //   const onSend = (messageArray) => {
// //     setMessages((previousMessages) =>
// //       GiftedChat.append(previousMessages, messageArray)
// //     );

// //     return (
// //       <View style={{ flex: 1 }}>
// //         <GiftedChat
// //           messages={messages}
// //           onSend={(messages) => onSend(messages)}
// //           user={{
// //             _id: 1,
// //           }}
// //         />
// //       </View>
// //     );
// //   };
// // };
// // export default FireBaseChat;

// import React, { useState, useEffect } from "react";
// import { View } from "react-native";
// import { GiftedChat, Bubble } from "react-native-gifted-chat";
// import firebase from "../config";
// import CryptoJS from "crypto-js";

// const FireBaseChat = (props) => {

//   const sender = props.navigation.getParam("senderID");
//   const reciever = props.navigation.getParam("recieverID");
//   const collection_id = props.navigation.getParam("channelID");
//   //  const collection_id = "D4P7";
//   const [messages, setMessages] = useState([]);
//   // const route = useRoute();

//   useEffect(() => {
//     const querySnapshot = firebase
//       .firestore()
//       .collection(collection_id)
//       .orderBy("createdAt", "desc");
//     querySnapshot.onSnapshot((snapShot) => {
//       const allMessages = snapShot.docs.map((snap) => {
//         return {
//           ...snap.data(),
//           createdAt: new Date(),
//         };
//       });
//       setMessages(allMessages);
//     });
//   }, []);

//   const onSend = (messageArray) => {
//     console.log(messageArray);
//     const msg = messageArray[0];
//     const myMsg = { ...msg, senderID: sender, receiverID: reciever };
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messageArray)
//     );
//     firebase
//       .firestore()
//       .collection(collection_id)
//       .add({
//         ...myMsg,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => {
//           onSend(messages);
//         }}
//         user={{
//           _id: sender,
//         }}
//         renderBubble={(props) => {
//           return (
//             <Bubble
//               {...props}
//               wrapperStyle={{
//                 right: {
//                   backgroundColor: "orange",
//                 },
//               }}
//             />
//           );
//         }}
//       />
//     </View>
//   );
// };

// FireBaseChat.navigationOptions = () => {
//   return {
//     headerShown: false,
//   };
// };
// export default FireBaseChat;

import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import firebase from "../../config";
import CryptoJS from "react-native-crypto-js";
import { Entypo } from "@expo/vector-icons";
import { Context as PatientContext } from "../context/patientContext";

const ChatScreen = (props) => {
  const { state } = useContext(PatientContext);

  const sender = `P${state.patient_data.patient_id}`;
  const reciever = `D${state.patient_data.d_id}`;
  const collection_id = ` D${state.patient_data.d_id}P${state.patient_data.patient_id}`;
  const [messages, setMessages] = useState([]);
  const [key, setKey] = useState("12345");

  useEffect(() => {
    console.log("Chat Room ID : ", collection_id);
    const querySnapshot = firebase
      .firestore()
      .collection(collection_id)
      .orderBy("createdAt", "desc");
    querySnapshot.onSnapshot((snapShot) => {
      const allMessages = snapShot.docs.map((snap) => {
        // Decrypt message before rendering
        const bytes = CryptoJS.AES.decrypt(snap.data().text, key);
        const text = bytes.toString(CryptoJS.enc.Utf8);

        return {
          ...snap.data(),
          createdAt: new Date(),
          text: text,
        };
      });
      setMessages(allMessages);
    });
  }, []);

  const onSend = (messageArray) => {
    const msg = { ...messageArray[0] };
    const ciphertext = CryptoJS.AES.encrypt(msg.text, key).toString();
    msg.text = ciphertext;
    const myMsg = { ...msg, senderID: sender, receiverID: reciever };

    // Encrypt message before sending to Firebase

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messageArray)
    );
    firebase
      .firestore()
      .collection(collection_id)
      .add({
        ...myMsg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
          //   alignItems: "center",
          //   justifyContent: "center",
          backgroundColor: "#B19FF9",
          padding: 10,
        }}
      >
        <Image
          source={require("../../assets/face.jpg")}
          style={{ marginLeft: 20, width: 50, height: 50, borderRadius: 25 }}
        />
        <Text
          style={{
            color: "white",
            marginLeft: 20,
            fontSize: 22,
            marginTop: 8,
            fontWeight: "bold",
          }}
        >
          {`Dr. ${state.doctor_data.firstName} ${state.doctor_data.lastName}`}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: 180,
          borderRadius: 70,
          backgroundColor: "#FAE6FA",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <Text> End to End Encrypted</Text>
        <Entypo name="lock" size={20} color="black" />
      </TouchableOpacity>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: sender,
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "rgba(111, 202, 186, 1)",
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

// FireBaseChat.navigationOptions = () => {
//   return {
//     headerLeft: () => <Text>This is me</Text>,
//     headerRight: () => (
//       <TouchableOpacity
//         onPress={() => {
//           props.navigation.navigate("Create");
//         }}
//       >
//         <AntDesign
//           style={{ marginRight: 20 }}
//           name="pluscircle"
//           size={24}
//           color="black"
//         />
//       </TouchableOpacity>
//     ),
//   };
// };

ChatScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default ChatScreen;

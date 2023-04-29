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

// export default ChatScreen;
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
// import firestore from "@react-native-firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

//import { useRoute } from "@react-navigation/native";
const Example = () => {
  const [messages, setMessages] = useState([]);
  // const route = useRoute();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (messageArray) => {
    console.log(messageArray);
    const msg = messageArray[0];
    const myMsg = { ...msg, senderId: 1, receiverId: 2 };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );
    getFirestore()
      .collection("chats")
      .doc(2)
      .collection("messages")
      .add({ ...myMsg, createdAt: new Date() });
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 2,
        }}
      />
    </View>
  );
};
Example.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default Example;

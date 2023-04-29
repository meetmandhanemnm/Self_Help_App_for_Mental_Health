import React, { useState, useReducer } from "react";
import { Alert } from "react-native";
import {
  View,
  ScrollView,
  InputText,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// const postPatientDetails = async (patientDetails, callback) => {
//   // await jsonServer.post("/patient", patientDetails);

//   try {
//     const resp = await jsonServer.post("/patient/", patientDetails);
//     console.log("\n\n\n\nPOSTING : Patient Details to DB");
//     console.log(patientDetails);
//     console.log("------------------RESPONSE FROM SERVER - Patient ID :");
//     const patient_obj_returned = resp.data;
//     const patient_id_returned = patient_obj_returned["patient_id"];
//     console.log(patient_obj_returned["patient_id"]);

//     //To to Register Page
//     callback(patient_id_returned);
//   } catch (e) {
//     console.log(
//       "\n\n\n----------------Ayoo..Something went wrong in POST - Saving Patient Detaials ",
//       e
//     );
//   }
// };

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      // const resp = await jsonServer.post(``, { email });
      console.log(email);
      Alert.alert(
        "Password Change",
        "New password sent to your Registerd Email-ID",
        [{ text: "OK", onPress: () => navigation.navigate("Start") }]
      );
    } catch {
      setError("Oppsss..Something went wrong! Verify the Email ID");
    }
  };
  return (
    <View style={style.containerStyle}>
      <Spacer>
        <Text
          h3
          style={{
            marginTop: 30,
            color: "purple",
          }}
        >
          We're humans afterall,{"\n"}It's ok to forget :)
        </Text>
        <View style={{ marginVertical: 60 }}></View>
        <Input
          label="Enter Registered EmailID "
          onChangeText={(data) => setEmail(data)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handlePress();
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 10, fontSize: 15, fontWeight: "bold" }}>
              Send
            </Text>
            <AntDesign name="message1" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {error ? (
          <Text style={{ marginTop: 20, alignSelf: "center", color: "red" }}>
            {error}
          </Text>
        ) : null}
        {/* 
        <Button
          title="Verify OTP"
          icon={{
            name: "user",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(199, 43, 98, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 10,
            alignSelf: "center",
          }}
          style={style.buttonStyle}
          onPress={() => {}}
        /> */}
      </Spacer>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: "#9370DB",
    padding: 15,
    borderRadius: 100,
    width: 150,
    alignSelf: "center",
    alignItems: "center",
  },
});
const style = StyleSheet.create({
  // entryStyle: {
  //   flexDirection: "row",
  //   marginLeft: 12,
  //   marginVertical: 15,
  // },
  // inputBoxStyle: {
  //   borderWidth: 3,
  //   borderColor: "grey",
  //   paddingTop: 5,
  //   paddingHorizontal: 10,
  // },
  // textBoxStyle: {
  //   marginTop: 10,
  //   fontWeight: "bold",
  // },
  // viewStyle: {
  //   // marginBottom: 30,
  //   paddingTop: 100,
  // },
  containerStyle: {
    marginTop: 40,
  },
  // buttonStyle: {
  //   paddingTop: 15,
  //   alignContent: "center",
  // },

  headerStyle: {
    marginVertical: 15,
    color: "rgba(199, 43, 98, 1)",
    textAlign: "center",
  },
  genderStyle: {
    marginTop: 40,
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    flex: 1,
  },
});

ForgotPassword.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default ForgotPassword;

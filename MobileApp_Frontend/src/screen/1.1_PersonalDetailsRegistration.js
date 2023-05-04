import React, { useState, useReducer } from "react";
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
import RadioGroup from "react-native-radio-buttons-group";

const postPatientDetails = async (patientDetails, callback) => {
  // await jsonServer.post("/patient", patientDetails);

  try {
    const resp = await jsonServer.post("/patient/", patientDetails);
    console.log("\n\n\n\nPOSTING : Patient Details to DB");
    console.log(patientDetails);
    console.log("------------------RESPONSE FROM SERVER - Patient ID :");
    const patient_obj_returned = resp.data;
    const patient_id_returned = patient_obj_returned["patient_id"];
    console.log(patient_obj_returned["patient_id"]);

    //To to Register Page
    callback(patient_id_returned);
  } catch (e) {
    console.log(
      "\n\n\n----------------Ayoo..Something went wrong in POST - Saving Patient Detaials ",
      e
    );
  }
};

const PersonalDetailsRegistration = ({ navigation }) => {
  let patientDetails = {};
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Male            ",
      value: "M",
    },
    {
      id: "2",
      label: "Female        ",
      value: "F",
    },
    {
      id: "3",
      label: "Trans           ",
      value: "T",
    },
    {
      id: "4",
      label: "Not Specify",
      value: "N",
    },
  ]);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    for (let i = 0; i < 4; i++) {
      let ele = radioButtonsArray[i];

      if (ele["selected"] == true) {
        patientDetails["gender"] = ele["value"];
        break;
      }
    }
  }
  //Need to get Doctor names from DB
  let patientAttributes = [
    "firstName",
    "lastName",
    "gender",
    "contact_number",
    "username",
    "password",
    "remarks",
    // "Doctor ID",
  ];

  return (
    <ScrollView style={style.containerStyle}>
      <Spacer>
        <Text
          h4
          style={{
            marginLeft: 10,
            marginTop: 10,
            color: "#9370DB",
          }}
        >
          Enter the
        </Text>
        <Text
          h2
          style={{
            marginLeft: 10,
            marginBottom: 30,
            color: "#9370DB",
          }}
        >
          below Details
        </Text>

        <Input
          label="Email"
          autoCapitalize="none"
          onChangeText={(data) => (patientDetails["email"] = data)}
        />
        <Input
          label="First Name"
          onChangeText={(data) => (patientDetails["firstName"] = data)}
        />
        <Input
          label="Last Name"
          onChangeText={(data) => (patientDetails["lastName"] = data)}
        />
        <Text
          style={{
            fontSize: 16,
            color: "grey",
            fontWeight: "bold",
            marginLeft: 10,
            marginBottom: 5,
          }}
        >
          Gender
        </Text>
        <View style={style.container}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
        </View>
        <View style={{ marginTop: 10 }} />
        <Input
          label="Contact No"
          keyboardType="numeric"
          onChangeText={(data) => (patientDetails["contact_number"] = data)}
        />
        <Input
          label="Username"
          autoCapitalize="none"
          onChangeText={(data) => (patientDetails["username"] = data)}
        />
        <Input
          label="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(data) => (patientDetails["password"] = data)}
        />
        <Input
          label="Re-type Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(data) => (patientDetails["password"] = data)}
        />
        <Input
          label="Remarks"
          onChangeText={(data) => (patientDetails["remarks"] = data)}
        />
        <Button
          title="Save Profile"
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
            // backgroundColor: "rgba(199, 43, 98, 1)",
            backgroundColor: "#9370DB",
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
          onPress={() =>
            postPatientDetails(patientDetails, (patientID) => {
              navigation.navigate("Register", { pat_id: patientID });
            })
          }
        />
      </Spacer>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "flex-start", // align to left
    marginHorizontal: 16, // set horizontal margin
  },

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

PersonalDetailsRegistration.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default PersonalDetailsRegistration;

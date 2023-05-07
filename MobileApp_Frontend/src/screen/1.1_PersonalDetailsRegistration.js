import React, { useState, useReducer, useContext } from "react";
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
import { Context as PatientContext } from "../context/patientContext";

const postPatientDetails = async (patientDetails, callback) => {
  // await jsonServer.post("/patient", patientDetails);

  try {
    // const resp = await jsonServer.post("/patient/", patientDetails);
    const resp = await jsonServer.post(
      "/api/auth/register/patient",
      patientDetails
    ); //with JSW
    const jwt = resp.headers.jwt;
    const JWT = resp.headers.JWT;

    console.log("Jwt : ", jwt);
    console.log("JWT : ", JWT);

    console.log("HEADERS :", resp.headers);

    console.log("\n\n\n\nPOSTING : Patient Details to DB");
    console.log(patientDetails);
    console.log(resp.headers);
    console.log("------------------RESPONSE FROM SERVER - Patient ID :");
    const patient_obj_returned = resp.data;
    const patient_id_returned = patient_obj_returned["patient_id"];
    console.log(patient_obj_returned["patient_id"]);

    //To to Register Page
    callback(patient_id_returned, jwt);
  } catch (e) {
    console.log(
      "\n\n\n----------------Ayoo..Something went wrong in POST - Saving Patient Detaials ",
      e
    );
  }
};

const PersonalDetailsRegistration = ({ navigation }) => {
  // let patientDetails = {
  //   firstName: "",
  //   lastName: "",
  //   gender: "",
  //   contact_number: "",
  //   username: "",
  //   password: "",
  //   remarks: "",
  // };
  const { state } = useContext(PatientContext);

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: state.language.Signup.gender.male,
      value: "M",
    },
    {
      id: "2",
      label: state.language.Signup.gender.female,
      value: "F",
    },
    {
      id: "3",
      label: state.language.Signup.gender.trans,
      value: "T",
    },
    {
      id: "4",
      label: state.language.Signup.gender.notSpecify,
      value: "N",
    },
  ]);
  const [errors, setErrors] = useState({});
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    for (let i = 0; i < 4; i++) {
      let ele = radioButtonsArray[i];

      if (ele["selected"] == true) {
        // patientDetails["gender"] = ele["value"];
        setGender(ele["value"]);
        setGenderErr("");
        break;
      }
    }
  }
  //Need to get Doctor names from DB
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState(" ");
  const [gender, setGender] = useState();
  const [contact_number, setContactNo] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password_re, setPasswordRE] = useState();
  const [remarks, setRemarks] = useState();

  const [emailErr, setEmailErr] = useState();
  const [firstNameErr, setFirstNameErr] = useState();
  const [lastNameErr, setLastNameErr] = useState();
  const [genderErr, setGenderErr] = useState();
  const [contact_numberErr, setContactNoErr] = useState();
  const [usernameErr, setUsernameErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const [password_reErr, setPasswordREErr] = useState();
  const [remarksErr, setRemarksErr] = useState();

  const validateData = () => {
    if (!email) {
      setEmailErr(state.language.Signup.error.emailReqd);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErr(state.language.Signup.error.emailFormat);
    } else setEmailErr("");

    if (!firstName) setFirstNameErr(state.language.Signup.error.firstNameReqd);
    else setFirstNameErr("");
    if (!contact_number)
      setContactNoErr(state.language.Signup.error.contactNoReqd);
    else if (!/^\d+$/.test(contact_number))
      setContactNoErr(state.language.Signup.error.contactNoFormat);
    else setContactNoErr("");

    if (!username) setUsernameErr(state.language.Signup.error.usernameReqd);
    else setUsernameErr("");
    if (!password) setPasswordErr(state.language.Signup.error.passwordReqd);
    else setPasswordErr("");
    if (!password_re || password != password_re)
      setPasswordREErr(state.language.Signup.error.passwordMismatch);
    else setPasswordREErr("");
    if (!gender) setGenderErr(state.language.Signup.error.genderReqd);
    else setGenderErr("");

    if (
      emailErr == "" &&
      firstNameErr == "" &&
      genderErr == "" &&
      contact_numberErr == "" &&
      usernameErr == "" &&
      passwordErr == "" &&
      password_reErr == ""
    )
      return true;
    else return false;
  };
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
          {state.language.Signup.title1}
        </Text>
        <Text
          h2
          style={{
            marginLeft: 10,
            marginBottom: 30,
            color: "#9370DB",
          }}
        >
          {state.language.Signup.title2}
        </Text>
        <Input
          label={state.language.Signup.email}
          autoCapitalize="none"
          onChangeText={(data) => {
            setEmail(data);
            setEmailErr("");
          }}
        />
        {emailErr ? <Text style={style.errorText}>{emailErr}</Text> : null}
        <Input
          label={state.language.Signup.firstName}
          onChangeText={(data) => {
            setFirstName(data);
            setFirstNameErr("");
          }}
        />
        {firstNameErr ? (
          <Text style={style.errorText}>{firstNameErr}</Text>
        ) : null}
        <Input
          label={state.language.Signup.lastName}
          onChangeText={(data) => setLastName(data)}
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
          {state.language.Signup.gender.title}
        </Text>
        <View style={style.container}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
          {genderErr ? <Text style={style.errorText}>{genderErr}</Text> : null}
        </View>
        <View style={{ marginTop: 10 }} />
        <Input
          label={state.language.Signup.contactNo}
          keyboardType="numeric"
          onChangeText={(data) => {
            setContactNo(data);
            setContactNoErr("");
          }}
        />
        {contact_numberErr ? (
          <Text style={style.errorText}>{contact_numberErr}</Text>
        ) : null}
        <Input
          label={state.language.Signup.username}
          autoCapitalize="none"
          onChangeText={(data) => {
            setUsername(data);
            setUsernameErr("");
          }}
        />
        {usernameErr ? (
          <Text style={style.errorText}>{usernameErr}</Text>
        ) : null}

        <Input
          label={state.language.Signup.password}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(data) => {
            setPassword(data);
            setPasswordErr("");
          }}
        />
        {passwordErr ? (
          <Text style={style.errorText}>{passwordErr}</Text>
        ) : null}

        <Input
          label={state.language.Signup.password_re}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(data) => {
            setPasswordRE(data);
            setPasswordREErr("");
          }}
        />
        {password_reErr ? (
          <Text style={style.errorText}>{password_reErr}</Text>
        ) : null}

        <Input
          label={state.language.Signup.remarks}
          onChangeText={(data) => setRemarks(data)}
        />
        <Button
          title={state.language.Signup.saveButtonTitle}
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
          onPress={() => {
            if (validateData()) {
              console.log(" PATIENT DETAILS : All Correct");

              let patientDetails = {
                email,
                firstName,
                lastName,
                contact_number,
                username,
                password,
                remarks,
                gender,
              };
              postPatientDetails(patientDetails, (patientID, jwt) => {
                navigation.navigate("Register", {
                  pat_id: patientID,
                  jwt: jwt,
                });
              });
            } else {
              console.log(" Some issue Correct");

              //Show alert
            }
          }}
        />
      </Spacer>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  errorText: { color: "red", alignSelf: "center", marginBottom: 10 },
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

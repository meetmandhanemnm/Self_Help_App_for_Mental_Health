import React from "react";
import { View } from "react-native";
import { setToken, validateUsnPassToken } from "../offlineStorage/1_Token";
import { Context as PatientContext } from "./../context/patientContext";
import { engLang } from "../languages/all_languages_content";
const InitScreen = (props) => {
  console.log("---In INIT SCREEN");
  const { addLanguage } = useContext(PatientContext);
  addLanguage(engLang);
  if (validateUsnPassToken()) {
    console.log("TOKEN EXUSTS IN LOCAL STORAGE");
    props.navigation.navigate("Start");
  } else {
    console.log("TOKEN NOT THERE");
    props.navigation.navigate("Start");
  }
  return <View></View>;
};

export default InitScreen;

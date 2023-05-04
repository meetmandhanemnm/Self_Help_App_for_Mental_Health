import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { navigate } from "../navigateRef";
import Spacer from "../components/Spacer";
import { Context as PatientContext } from "../context/patientContext";

const DetailsEntry = ({ question, response }) => {
  return (
    <View style={style.viewEntryStyle}>
      <Text style={style.entryHeaderStyle}>{question} </Text>
      <Text style={style.entryValueStyle}>{response}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  viewEntryStyle: {
    flexDirection: "row",
    marginTop: 40,
  },
  entryHeaderStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  entryValueStyle: {
    fontSize: 20,
    marginRight: 10,
  },
});
export default DetailsEntry;

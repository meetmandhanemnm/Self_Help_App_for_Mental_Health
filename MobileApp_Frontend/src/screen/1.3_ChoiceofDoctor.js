import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
const ChoiceofDoctor = ({ navigation }) => {
  console.log("\n\n\t\t (((((((( CHOICE OF DOCTOR ))))))))))))))))))");
  const [result, setResult] = useState("");
  //   const pat_id = navigation.getParms("pat_id");
  //   console.log("\n Patient ID recieved : ", pat_id);
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "I do want a Doctor",
      value: "Y",
    },
    {
      id: "2",
      label: "I can manage haha",
      value: "F",
    },
  ]);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    for (let i = 0; i < 2; i++) {
      let ele = radioButtonsArray[i];

      if (ele["selected"] == true) {
        setResult(ele["value"]);
        break;
      }
    }
  }
  const postResponse = (callback) => {
    //Post response to Backend
    try {
    } catch (err) {
      console.log(
        "\n\t\t Ayoo : Issue Submitting Choice of Doctor ",
        err.message
      );
    }

    //
    console.log("Selected Option : ", result);

    //Go to startscreen
    // callback();
  };
  return (
    <View>
      <Text
        style={{
          marginTop: 180,
          marginHorizontal: 20,
          marginBottom: 40,
          fontSize: 23,
          textAlign: "center",
        }}
      >
        {" "}
        Do you want a doctor assigned to you?
      </Text>
      <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
      <Button
        title="Submit"
        onPress={() => {
          postResponse(() => {
            navigation.navigate("Start");
          });
        }}
        icon={{
          name: "save",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#088F8F",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          alignSelf: "center",
          marginTop: 40,
        }}
      />

      <Image
        style={style.imageStyle}
        source={require("../../images/doctor.jpg")}
      />
    </View>
  );
};

const style = StyleSheet.create({
  imageStyle: {
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 100,
  },
});

ChoiceofDoctor.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default ChoiceofDoctor;

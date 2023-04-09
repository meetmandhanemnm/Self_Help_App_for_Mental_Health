import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { navigate } from "../navigateRef";
import Spacer from "../components/Spacer";

const AccountScreen = () => {
  const [patient_det, setPatientDet] = useState("");

  try {
    setPatientDet(props.navigation.getParam("pat_det"));
  } catch (e) {
    console.log("--------------- Error getting Patient Detials ");
  }
  console.log("----------- Patient Details : ---------");
  console.log(patient_det);
  return (
    <View style={{ marginTop: 40 }}>
      <Spacer>
        <Text h2 style={{ marginTop: 40 }}>
          Welcome Simha !!!
        </Text>
        <Text h4 style={{ marginTop: 40 }}>
          Completed 3/10 workout
        </Text>
        <Text style={{ marginTop: 140 }}> More user specific details.....</Text>
        <Button
          title="Logout"
          onPress={() => {
            //   removeUsnPassToken();
            navigate("loginFlow");
          }}
          icon={{
            name: "",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#5F9EA0",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            alignSelf: "center",
            marginVertical: 30,
          }}
        />
      </Spacer>
    </View>
  );
};

export default AccountScreen;

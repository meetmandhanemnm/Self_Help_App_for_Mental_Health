import React, { useState, useReducer, useContext } from "react";
import { Alert } from "react-native";
import {
  View,
  ScrollView,
  InputText,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Context as PatientContext } from "./../context/patientContext";
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
  const { state } = useContext(PatientContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  // const handlePresss = async () => {
  //   try {
  //     // const resp = await jsonServer.post(``, { email });
  //     console.log(email);
  //     Alert.alert(
  //       "Password Change",
  //       "New password sent to your Registerd Email-ID",
  //       [{ text: "OK", onPress: () => navigation.navigate("Start") }]
  //     );
  //   } catch {
  //     setError("Oppsss..Something went wrong! Verify the Email ID");
  //   }
  // };
  const validateEmail = async () => {
    setIsLoading(true);
    try {
      // const resp = await jsonServer.put(`/patient/resetPassword/${email}`);
      const resp = await jsonServer.post(`/api/auth/forgotPass/${email}`);

      setIsLoading(false);
      //Open Success Model
      handlePress();
    } catch (err) {
      setIsLoading(false);
      setError(state.language.ForgotPassword.errorMessage);
    }
  };
  return (
    <View style={style.containerStyle}>
      <Spacer>
        <Text
          h3
          style={{
            marginTop: 30,
            color: "#9370DB",
          }}
        >
          {state.language.ForgotPassword.titleText}
        </Text>
        <View style={{ marginTop: 120 }}></View>
        <Input
          label={state.language.ForgotPassword.email}
          onChangeText={(data) => setEmail(data)}
        />
        {error ? (
          <Text style={{ alignSelf: "center", color: "red" }}>{error}</Text>
        ) : null}
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            validateEmail();
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 10, fontSize: 15, fontWeight: "bold" }}>
              {state.language.ForgotPassword.sendButtonTitle}
            </Text>
            <AntDesign name="message1" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </Spacer>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      <Modal //Check email prompt
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {state.language.ForgotPassword.modalText1}{" "}
              <FontAwesome name="key" size={24} color="black" />{" "}
              {state.language.ForgotPassword.modalText2}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Start");
              }}
            >
              <Text style={styles.closeButton}>Goto Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 200,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#9370DB",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  modal: {
    backgroundColor: "black",
    padding: 20,
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
  button: {
    marginTop: 20,
    backgroundColor: "#9370DB",
    padding: 15,
    borderRadius: 100,
    width: 150,
    alignSelf: "center",
    alignItems: "center",
  },
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

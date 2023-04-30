import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { navigate } from "../navigateRef";
import Spacer from "../components/Spacer";
import { Context as PatientContext } from "../context/patientContext";
import DetailsEntry from "../components/3_DetailsEntry";
import { removeOfflineData } from "./../offlineStorage/1_Token";
import jsonServer from "../../api/jsonServer";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const requestNewDoctor = () => {
  console.log("\n\n\t >>>>> requestNewDoctor() ");
  try {
  } catch (err) {
    console.log("\n\n\t AYOO : Issue REquesting Doctor");
  }
};

const AccountScreen = (props) => {
  const { state } = useContext(PatientContext);
  const [doctorModalVisible, setdoctorModalVisible] = useState(false);
  const [passwordModelVisible, setpasswordModelVisible] = useState(false);
  const [newpass1, setNewPass1] = useState("");
  const [newpass2, setNewPass2] = useState("");
  const [passError, setPassError] = useState("");

  const workout_data = state.workout_data;
  const [remark, setRemark] = useState("");
  const [error, setError] = "";

  // console.log("OFFLIVE DATA : : ", state);
  let total = 0;
  for (let i = 0; i < workout_data.length; i++) {
    if (workout_data[i].completed) total += 1;
  }
  const handlePress = () => {
    setdoctorModalVisible(true);
  };
  const changeDoctorInDB = async () => {
    console.log("\n\n\t >>>>> changeDoctorInDB() | Request for a change");
    try {
      const req_body = { patient: state.patient_data, remark };
      const resp = await jsonServer.post(`/patient/doctor`, req_body);
      console.log(" ----- Request Sent : ", resp.data);
    } catch (err) {
      console.log("\n\n\t AYOO : Issue changing Doctor");
    }
    setdoctorModalVisible(false);
  };
  const changePasswordInDB = async (new_password) => {
    console.log("\n\n\t >>>>> changePasswordInDB() | Request for a change");
    try {
      const req_body = { patient: state.patient_data, password: new_password };
      const resp = await jsonServer.post(`//`, req_body);
      console.log(" ----- Request Sent : ", resp.data);
    } catch (err) {
      console.log("\n\n\t AYOO : Issue changing Password");
    }
    setpasswordModelVisible(false);
  };

  const handleModalClose = () => {
    setdoctorModalVisible(false);
    setpasswordModelVisible(false);
  };
  // state.patient_data.d_id = 8;
  return (
    <View style={{ marginTop: 40 }}>
      <Spacer>
        <Text h3 style={{ marginTop: 60 }}>
          Namaskar
        </Text>
        <Text h2 style={{ marginBottom: 20, color: "rgba(130, 202, 186, 1)" }}>
          {`${state.patient_data.firstName} ${state.patient_data.lastName} !!`}
        </Text>
        <DetailsEntry
          question={"Patient ID "}
          response={state.patient_data.patient_id}
        />

        <DetailsEntry
          question={"Status "}
          response={`${total}/${workout_data.length} workouts completed`}
        />
        <DetailsEntry
          question={"Sevarity "}
          response={state.patient_data.severity}
        />

        {state.patient_data.d_id == 0 ? (
          <View>
            <TouchableOpacity onPress={requestNewDoctor()}>
              <Text style={{ marginTop: 10, fontSize: 14, color: "blue" }}>
                Need a doctor's help ? click here
              </Text>
              <DetailsEntry />
            </TouchableOpacity>
          </View>
        ) : (
          // <Button
          //   title="Request a Doctor"
          //   onPress={() => {
          //     //   removeUsnPassToken();
          //     requestNewDoctor();
          //   }}
          //   icon={{
          //     name: "",
          //     type: "font-awesome",
          //     size: 15,
          //     color: "white",
          //   }}
          //   iconContainerStyle={{ marginRight: 10 }}
          //   titleStyle={{ fontWeight: "700" }}
          //   buttonStyle={{
          //     backgroundColor: "#5F9EA0",
          //     borderColor: "transparent",
          //     borderWidth: 0,
          //     borderRadius: 30,
          //   }}
          //   containerStyle={{
          //     width: 200,
          //     alignSelf: "center",
          //     marginVertical: 30,
          //   }}
          // />
          <>
            <DetailsEntry
              question={"Assigned Doctor"}
              response={
                "Dr." +
                " " +
                state.doctor_data.firstName +
                " " +
                state.doctor_data.lastName
              }
            />

            {/* <TouchableOpacity onPress={changeDoctorInDB()}>
              <Text style={{ marginTop: 10, fontSize: 14, color: "blue" }}>
                Change Doctor? click here
              </Text>
            </TouchableOpacity> */}

            {/* <Button
              title="Change Doctor"
              onPress={() => {
                //   removeUsnPassToken();
                changeDoctorInDB();
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
            /> */}
          </>
        )}
        <Spacer>
          <Text style={{ fontSize: 20, marginTop: 40 }}>Important Links :</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{ marginTop: 10, fontSize: 14, color: "blue" }}>
              Change Doctor?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setpasswordModelVisible(true);
            }}
          >
            <Text style={{ marginTop: 10, fontSize: 14, color: "blue" }}>
              Change Password?
            </Text>

            <Modal //Change Doctor Model
              animationType="slide"
              transparent={true}
              visible={doctorModalVisible}
              onRequestClose={handleModalClose}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Doctors could be annoying!! Any specific reasons in
                    <MaterialCommunityIcons
                      name="head"
                      size={24}
                      color="black"
                    />
                    ?
                  </Text>

                  <Input onChangeText={(data) => setRemark(data)} />

                  <TouchableOpacity onPress={changeDoctorInDB}>
                    <Text style={styles.closeButton}>Request Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal //Change Password Model
              animationType="slide"
              transparent={true}
              visible={passwordModelVisible}
              onRequestClose={handleModalClose}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView2}>
                  <Text style={styles.modalText}>
                    Everb
                    <AntDesign name="smileo" size={24} color="black" />
                    dy likes changes
                  </Text>
                  <View style={{ marginTop: 20 }} />
                  <Input
                    autoCapitalize="none"
                    secureTextEntry={true}
                    label="Enter new password"
                    onChangeText={(data) => setNewPass1(data)}
                  />
                  <Input
                    autoCapitalize="none"
                    secureTextEntry={true}
                    label="Re Enter new password"
                    onChangeText={(data) => {
                      setNewPass2(data);
                      if (!newpass1 && !newpass2 && newpass1 !== newpass2)
                        setPassError("notmatch");
                      // dont know why its not setting
                      else setPassError("");
                    }}
                  />
                  {passError ? (
                    <Text style={{ color: "red" }}>
                      Seems like the Passwords don't match
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      if (newpass1 === newpass2) {
                        console.log("CHANGE PASSWORD :  Pass MATCH");
                        changePasswordInDB(newpass1);
                      } else {
                        setPassError("Passwords Not matching...yet...");
                        console.log("CHANGE PASS : Pass not MATCHING");
                      }
                    }}
                  >
                    <Text style={styles.closeButton}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        </Spacer>
      </Spacer>
      <View style={{ flexDirection: "row", marginTop: 90 }}>
        <Button
          title="WorkoutList"
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(130, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 30,
            height: 50,
            width: 155,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            props.navigation.navigate("PatientHome");
          }}
        />
        <Button
          title="Logout"
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(130, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 10,
            height: 50,
            width: 150,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            axios.delete(
              `https://app.nativenotify.com/api/app/indie/sub/7695/wDN7Drh1sdRsg6rE11FAVz/${state.patient_data.patient_id}`
            );
            removeOfflineData("token");
            props.navigation.navigate("Start");
          }}
        />
      </View>
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
    height: 250,
  },
  modalView2: {
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
    height: 370,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#rgba(130, 202, 186, 1)",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  modal: {
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
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
  },
});

AccountScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default AccountScreen;

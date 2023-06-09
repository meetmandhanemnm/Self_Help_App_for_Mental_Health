import React, { useEffect, useState, useContext } from "react";
import {
  View,
  InputText,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-navigation";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import DropDownComponent from "../components/2_DropDownComponent";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  removeToken,
  tokenAvaliable,
  removeUsnPassToken,
  storeOfflineData,
  setToken,
  getOfflineData,
  removeOfflineData,
} from "../offlineStorage/1_Token";
import { Context as PatientContext } from "../context/patientContext";
// import { Context as BlogContext } from "../context/blogContext";
import { registerIndieID } from "native-notify";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// import { useIsFocused } from "@react-navigation/native"; //for react 5

// const reducer = (state, action) => {
//   return {...state,{"id":action.payload.id}}
// };
// const getToken = async () => {
//   try {
//     await AsyncStorage.getItem("token").then((token) =>
//       console.log("Toeknnnnn ()()()(  ===========", token)
//     );
//   } catch (e) {
//     console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO TOKEN");
//   }
// };
// const patientReducerStorage = (patient_det, PatientContext) => {
//   const { state, addPatient } = useContext(PatientContext);
//   try {
//     console.log("----------- Patient Details : ---------");
//     console.log("\n\n\n\n\n==== Patient Detials from Reducer BEFORE ", state);

//     console.log("==== Trying to Add Patient to Reducer ( In Pat Home)");
//     addPatient(patient_det);

//     console.log(
//       "+_+_+_+_+_+_+_+_____________++++++++++++_______________+++\n Patient Data from Reducer : \n",
//       state.patient_data
//     );
//   } catch (err) {
//     console.log(
//       "\n\n\t\t ------------ Ayoo : Reducer Issue to add ",
//       err.message
//     );
//   }
// };
import { engLang } from "../languages/all_languages_content";
const logOut = (callback) => {
  //Clear all Cache
  removeToken();
  removeOfflineData("patient_data");
  removeOfflineData("workout_data");
  callback();
};

const PatientHome = (props) => {
  console.disableYellowBox = true;
  const { state, addWorkout, addLanguage } = useContext(PatientContext);
  const [workout_data, setWorkoutData] = useState("");
  const [quote, setQuote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const quotes = state.language.Quotes;
  console.log("\n\n(((((((((((((((PATEINT HOME)))))))))))))))");
  const [modalChatVisible, setModalChatVisible] = useState(false);

  //For appending Header with JWT
  jsonServer.interceptors.request.use((config) => {
    const token = `Bearer ${state.token}`;
    config.headers.Authorization = token;
    return config;
  });

  const handleChatModalClose = () => {
    setModalChatVisible(false);
  };

  const getPatientWorkOut = async () => {
    // console.log("\n\n >>>>>>>> getPatientWorkout()\n");
    // console.log("\n\n\n\n\n==== Reducer data BEFORE ", state);

    //Registration for PushNotification
    console.log(
      "--------- Register For Push Notificaiton : ID (For API)- ",
      state.patient_data.patient_id
    );
    registerIndieID(`16`, 7793, "Mm8O7Ld44FO4SEC6hbBrfd");

    // registerIndieID(`${state.patient_data.patient_id}`, 7793, 'Mm8O7Ld44FO4SEC6hbBrfd');

    // To Get the workout of the Perticular patient ( Using patient ID)
    try {
      const patientID = state.patient_data.patient_id;

      //const response = await jsonServer.get(`/patient/workout/${patientID}`);
      const response = await jsonServer.get(`/patient/workout/${patientID}`);

      setWorkoutData(response.data);
      addWorkout(response.data);
      storeOfflineData("workout_data", JSON.stringify(response.data));
      // setToken();
      //getOfflineData("workout_data");
    } catch (e) {
      console.log("\n\n\n----------------Ayoo..Issue Getting the Workouts");
      console.log(e.message);
      console.log("\n\t Checking Local Storage -- ");
      //If Token exists and not connected to network, Get from offline
      try {
        const backendData = await getOfflineData("workout_data");
        if (backendData) {
          console.log(
            "\n\n\t\t Getting WorkoutData from Local Storage ( Offline Mode )"
          );

          addWorkout(backendData);
          setWorkoutData(backendData);
        } else {
          // No storage and  No Network connection
          //Throw a prompt to connect to network
          console.log("\n\n\t\t Ayoooo : Cannot get offline Data");
        }
      } catch (err) {
        console.log("\n\t Ayoo : Some Promise Issue with Local Storage");
      }
    }

    //Adding Workout Data  to reducer:
    try {
      // console.log(
      //   "----------- Workout Details : useState(workout_data): ---------"
      // );
      // console.log(workout_data);
    } catch (err) {
      console.log(
        "\n\n\t\t ------------ Ayoo : Reducer Issue to add Workout ",
        err.message
      );
    }
    // console.log("\n\n\n\n\n==== Reducer data AFTER ", state);
  };
  useEffect(() => {
    getPatientWorkOut();
    console.log("\n\t:Patient Data \n", state.patient_data);
    console.log("Workout Data:\n", state.workout_data);
    console.log("Doctor Data :\n", state.doctor_data);
    console.log("Language Data :\n", state.language);
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
    setModalVisible(true);
  };
  // const updateWorkoutDataFromReducer = () => {
  //   setWorkoutData(state.workout_data);
  // };

  // const unsubscribe = props.navigation.addListener("didFocus", () => {
  //   console.log("focussed");
  //   //getPatientWorkOut();

  //   updateWorkoutDataFromReducer();
  // });

  let total = 0;
  for (let i = 0; i < workout_data.length; i++) {
    if (workout_data[i].completed) total += 1;
  }

  const [expandState, setState] = React.useState([]);

  // console.log(
  //   "\n\n<<<<<<<<<<<<<<< Before Render -UseState -> workout data : \n",
  //   workout_data
  // );
  // console.log(
  //   "\n\n<<<<<<<<<<<Reducer data -> Workout Reducer : \n ",
  //   state.workout_data
  // );
  const getWotkoutName = (preid) => {
    // console.log(" Calling getWorkoutName ....", state.workout_data.length);
    for (let i = 0; i < state.workout_data.length; i++) {
      // console.log(" Comparisoin :", state.workout_data);
      if (state.workout_data[i].workout_instance_id === preid)
        return state.workout_data[i].workout.title;
    }
    // console.log("Falieddddddddd");
    return preid;
  };

  return (
    <View style={style.containerStyle}>
      <Spacer />
      {/* <Text
        h3
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: 19,
        }}
      >
        Hello {state.patient_data.firstName}
    
      </Text> */}
      <Spacer>
        <Text h3 style={{}}>
          {state.language.PatientHome.welcomeTitle}
        </Text>
        <Text h2 style={{ color: "rgba(111, 202, 186, 1)" }}>
          {`${state.patient_data.firstName} ${state.patient_data.lastName} !!`}
        </Text>
      </Spacer>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{quote}</Text>

            {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      <FlatList
        data={workout_data} // It works for this also ( Technically it should not)
        //data={state.workout_data}
        keyExtractor={(workout) => workout.workout_instance_id}
        renderItem={({ item }) => {
          return expandState.includes(item.workout_instance_id) ? ( //For completed workouts
            <Spacer>
              <DropDownComponent
                workout_title={item.workout.title}
                workout_description={item.workout.description}
                workout_status={item.completed}
                goToQuestions={() =>
                  props.navigation.navigate("Questions", {
                    workoutObj: item,
                  })
                }
                questions=""
                expandable={true}
                onPress={() => {
                  {
                    setState(
                      expandState.filter((i) => i !== item.workout_instance_id)
                    );
                  }
                }}
              />
            </Spacer>
          ) : (
            <DropDownComponent
              workout_title={item.workout.title}
              //{item.workout.title}
              workout_description={item.description}
              workout_status={item.completed}
              expandable={false}
              preReqId={item.pre_id}
              preReqName={getWotkoutName(item.pre_id)}
              onPress={() => {
                {
                  if (item.pre_id == 0)
                    setState([...expandState, item.workout_instance_id]);
                }
              }}
            />
          );
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <Button
          title={state.language.PatientHome.accountButton}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 6,
            height: 50,
            width: 140,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            props.navigation.navigate("Account");
          }}
        />

        <TouchableOpacity
          onPress={() => {
            getRandomQuote();
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 28, marginTop: 10 }}>
            {/* <FontAwesome name="heartbeat" size={30} color="#B19FF9" /> */}
            <Entypo name="emoji-happy" size={30} color="#B19FF9" />
          </View>
        </TouchableOpacity>

        <Button
          title={state.language.PatientHome.chatButton}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginRight: 10,
            marginLeft: 39,
            height: 50,
            width: 137,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            if (state.patient_data.d_id == 0) {
              setModalChatVisible(true);
              // Give a modal telling doctor not assigned
            } //If doctor is assigned
            else props.navigation.navigate("Chat");
          }}
        />
        <Modal //If Doctor is not Assigned
          animationType="slide"
          transparent={true}
          visible={modalChatVisible}
          onRequestClose={handleChatModalClose}
        >
          <View style={stylesChatModel.centeredView}>
            <View style={stylesChatModel.modalView}>
              <Text style={stylesChatModel.modalText}>
                state.language.PatientHome.chatModal
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalChatVisible(false);
                }}
              >
                <Text style={stylesChatModel.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const stylesChatModel = StyleSheet.create({
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#B19FF9",
    padding: 10,
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#B19FF9",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    color: "#B19FF9",
    fontWeight: "bold",
    fontSize: 18,
  },
});
const style = StyleSheet.create({
  containerStyle: {
    marginTop: 50,
    flex: 1,
  },
});
PatientHome.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default PatientHome;

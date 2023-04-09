import React, { useEffect, useState, useContext } from "react";
import { View, InputText, StyleSheet } from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-navigation";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import DropDownComponent from "../components/2_DropDownComponent";
import { Entypo } from "@expo/vector-icons";
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

const logOut = (callback) => {
  //Clear all Cache
  removeToken();
  removeOfflineData("patient_data");
  removeOfflineData("workout_data");
  callback();
};

const PatientHome = (props) => {
  // console.log("\n\n(((((((((((((((PATEINT HOME)))))))))))))))");
  const { state, addWorkout } = useContext(PatientContext);
  const [workout_data, setWorkoutData] = useState("");

  const getPatientWorkOut = async () => {
    // console.log("\n\n >>>>>>>> getPatientWorkout()\n");
    // console.log("\n\n\n\n\n==== Reducer data BEFORE ", state);

    // To Get the workout of the Perticular patient ( Using patient ID)
    try {
      // const patientID = patient_det["patient_id"];
      //const patientID = 29;
      const patientID = state.patient_data.patient_id;
      //  console.log("\n\n\n-----------------GET : Getting Patient Workout Data");
      //  console.log(" URL USed : ", `/patient/workout/${patientID}`);
      const response = await jsonServer.get(`/patient/workoutt/${patientID}`);
      // const response2 = await jsonServer.get(`/patient/workout/${patientID}`);
      //   console.log(response.data);
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
  }, []);

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
      <Text
        h3
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: 19,
        }}
      >
        Hello {state.patient_data.firstName}
        {/* Hello Simha!!! */}
      </Text>
      <Spacer />
      <Text h4 style={{ textAlign: "center" }}>
        Completed {total} / {workout_data.length} workouts
      </Text>
      <Spacer />

      <FlatList
        data={workout_data} // It works for this also ( Technically it should not)
        //data={state.workout_data}
        keyExtractor={(workout) => workout.workout_instance_id}
        renderItem={({ item }) => {
          return expandState.includes(item.workout_instance_id) ? (
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
              workout_title={
                item.pre_id != 0
                  ? `${item.workout.title}  ( PreReq: ${getWotkoutName(
                      item.pre_id
                    )})`
                  : item.workout.title
              }
              //{item.workout.title}
              workout_description={item.description}
              workout_status={item.completed}
              expandable={false}
              preReqId={item.pre_id}
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

      <Button
        title="Logout"
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 150,
          marginBottom: 10,
          alignSelf: "center",
        }}
        onPress={() => {
          logOut(() => props.navigation.navigate("Start"));
        }}
      />
    </View>
  );
};

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

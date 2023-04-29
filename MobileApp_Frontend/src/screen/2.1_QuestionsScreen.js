import React, { useEffect, useState, useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import navigate from "../navigateRef";
import { Context as PatientContext } from "../context/patientContext";

const QuestionsScreen = ({ navigation }) => {
  //********************************************************** */
  // For Logging Reducer data . State not used in code ( only updatePreReqWorkout is used)
  console.log("\n\n\t ((((((((( QUESTION PAGE of Workout ))))))))");
  const { state, addWorkout } = useContext(PatientContext);

  // console.log("\n\n+++++++++++++++++++++++++++++++++ Reducer VAL:  \n", state);

  //********************************************************** */
  // const [questions, setQuestions] = useState("");

  const { updateWorkoutStatus, updatePreReqWorkout } =
    useContext(PatientContext);
  const [responses, setRespose] = useState([]);
  const workoutObj = navigation.getParam("workoutObj");
  //workoutObj is the Workout Obj that was clicked from the previous page

  console.log("Workout Obj : ", workoutObj);
  const workout_id = workoutObj.workout.workout_id;
  const workout_instance_id = workoutObj.workout_instance_id;
  const questions = workoutObj.workout.questions;

  //For sending Q and Response for the perticular workout - For workout with Q & A
  const postResponse = async (question_response, callback) => {
    console.log(
      "\n\n\n-----------------POST ( Workout Questions Response) : UPDATING DB with Responses"
    );
    try {
      // const resp = await jsonServer.post("/questionare_answers", responses);
      const resp = await jsonServer.post(
        `/patient/workout/response`,
        question_response
      );

      console.log("Responses : \n", resp.data);
      console.log("Going to PATIENT HOME");
      callback();
    } catch (e) {
      console.log(
        "\n\n\n----------------Ayoo Some expection while Submitting the responses",
        e
      );
    }
  };

  // For workout without Q&A : Update workout is Complete
  const postResponse_onlyID = async (callback) => {
    console.log(
      " \n\n\t    >>postResponse_onlyID()   : workout_instance_id:",
      workout_instance_id
    );
    const responseObj = {
      workout_instance_id: workout_instance_id,
    };

    try {
      const resp = await jsonServer.post(
        `/patient/workout/complete`,
        responseObj
      );
    } catch (err) {
      console.log(
        "\n\t Ayoooo : Issue in POSTING Status when Workout Complete ( w/o Qs) : ",
        err.message
      );
    }
    //Going back to patient
    callback();
  };

  //Update PreReq as 0 in DB for workouts whos prereq = current workout instance id
  const updateBackEndPreReq = async (workout_instance_id) => {
    console.log(
      "\n >>>>>>>>>>>>> updateBackEndPreReq()  -----\n For workout instance id : ",
      workout_instance_id
    );
    const responseObj = {
      workout_instance_id: workout_instance_id,
    };

    try {
      const resp = await jsonServer.put(
        `/patient/workout/complete`,
        responseObj
      );
      console.log("\n\n\t\t SENTTTTT");
    } catch (err) {
      console.log(
        "\n\t\t Ayooo: Issue Updating to Backend - PreReq ",
        err.message
      );
    }
  };

  //Make the Status as complete for the given workout ID and Preworkout are assigned 0 for linked workout
  const updateWorkoutReducerState = () => {
    console.log("\n >>>>>>>>>>>>> updateWorkoutReducerState()  -----");
    // workoutObj.completed = true;
    // updateWorkoutStatus(workout_instance_id);
    // updatePreReqWorkout(workout_instance_id);
    try {
      const workoutCopy = state.workout_data;
      //console.log("\n\t Copy of Reducer - Workout Object : ");
      // console.log(workoutCopy);

      for (let i = 0; i < workoutCopy.length; i++) {
        if (workoutCopy[i].workout.workout_id == workout_id) {
          workoutCopy[i].completed = true;
          //   workoutCopy[i].title = "Hahaha";
          //.,mn updateResultToBackend(workout_id, workoutCopy[i]);
        }
      }

      for (let i = 0; i < workoutCopy.length; i++) {
        if (workoutCopy[i].pre_id == workout_instance_id) {
          workoutCopy[i].pre_id = 0;
          updateBackEndPreReq(workoutCopy[i].workout_instance_id);
        }
      }

      console.log("\n Updating Workout Value to Workout Reducer fun");
      addWorkout(workoutCopy);
    } catch (err) {
      console.log(
        " \n\n\t Ayoo : Some issue in Updation of Workout - for preid"
      );
    }

    // updateResultToBackend();
  };
  const sendSoltions = () => {};

  // const getQuestions = async (workout_id) => {
  //   try {
  //     console.log("\n\n\n-----------------GET : Getting Questions. ");

  //     // const resp = await jsonServer.post("/questionare_answers", responses);
  //     const resp = await jsonServer.get(
  //       `/patient/workout/questions/${workout_id}`
  //     );
  //     setQuestions(resp.data);

  //     console.log("Responses (workoutInstanceQuestions): \n", resp.data);
  //   } catch (e) {
  //     console.log(
  //       "\n\n\n----------------Ayoo Some expection whileRetreiving Questions",
  //       e.message
  //     );
  //   }
  // };
  // useEffect(() => {
  //   // getQuestions(workout_id);
  // }, []);

  // To Build Response to update the answer
  const updateResponse = (qid, que, ans) => {
    if (
      responses.filter(
        (respone) => respone.workout_question.workout_question_id == qid
      ).length > 0
    )
      return responses.map((response) => {
        return response.workout_question.workout_question_id == qid
          ? {
              workout_question: {
                workout_question_id: qid,
                question: que,
              },
              response: ans,
              instance_id: workout_instance_id,
            }
          : response;
      });
    else {
      return [
        ...responses,
        {
          workout_question: {
            workout_question_id: qid,
            question: que,
          },
          response: ans,
          instance_id: workout_instance_id,
        },
      ];
    }
  };

  if (workoutObj.workout.questions == 0) {
    //When there are no Questions for the wortkout
    return (
      <View>
        <Text style={{ textAlign: "center", marginTop: 150, fontSize: 20 }}>
          Woooahh!!! No Questions this time..Enjoyyy
        </Text>
        <Button
          title="Mark as Complete"
          onPress={() => {
            //Update status as complete for the given workout AND Update the Prereq value of dependent workout
            updateWorkoutReducerState();
            postResponse_onlyID(() => {
              navigation.navigate("PatientHome");
              // navigate("PatientHome");
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
            backgroundColor: "#5F9EA0",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            alignSelf: "center",
            marginTop: 100,
          }}
        />
        {/* <Image
          source={require("../../images/enjoy.jpg")}
          style={{ width: 50, alignSelf: "center" }}
        /> */}
      </View>
    );
  }
  //When workout has Questions
  else {
    return (
      <View>
        <Text
          h4
          style={{
            textAlign: "center",
            color: "#5F9EA0",
            marginTop: 100,
            marginBottom: 80,
          }}
        >
          Answer the below questions
        </Text>
        <Spacer>
          <FlatList
            data={questions}
            keyExtractor={(question) => question.workout_question_id}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text> {item.question} : </Text>
                  <Input
                    val=""
                    keyboardType="numeric"
                    onChangeText={(newVal) =>
                      setRespose(
                        updateResponse(
                          item.workout_question_id,
                          item.question,
                          newVal
                        )
                      )
                    }
                  />
                </View>
              );
            }}
          />
        </Spacer>

        <Button
          title="Submit"
          onPress={() => {
            //Update status as complete for the given workout AND Update the Prereq value of dependent workout
            updateWorkoutReducerState();
            postResponse(responses, () => {
              navigation.navigate("PatientHome");
              // navigate("PatientHome");
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
      </View>
    );
  }
};

QuestionsScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default QuestionsScreen;

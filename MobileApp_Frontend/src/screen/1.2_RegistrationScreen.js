import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  VirtualizedList,
} from "react-native";
import jsonServer from "../../api/jsonServer";
import { Input, Text, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const RegistrationScreen = ({ navigation }) => {
  console.reportErrorsAsExceptions = false;
  const patient_id = navigation.getParam("pat_id");
  const jwt = navigation.getParam("jwt");
  console.log("JWTTTT : ", jwt);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [responses, setRespose] = useState([]);

  //// For appending Header with JWT
  jsonServer.interceptors.request.use((config) => {
    const token = `Bearer ${jwt}`;
    config.headers.Authorization = token;
    return config;
  });

  const updateResponse = (qid, ans) => {
    if (responses.filter((respone) => respone.question.qid == qid).length > 0)
      return responses.map((response) => {
        return response.question.qid == qid
          ? { question: { qid: qid }, answer: ans }
          : response;
      });
    else {
      return [...responses, { question: { qid: qid }, answer: ans }];
    }
  };

  const getQuestions = async () => {
    // const response = await jsonServer.get("/questionare");
    try {
      // const response = await jsonServer.get("/patient/questions");
      const response = await jsonServer.get("/patient/questions");

      setQuestions(response.data);
      console.log("\n\n\n-----------------GET : Getting Questionare Questions");
      //  console.log(response);
      console.log(response.data);
    } catch (e) {
      console.log(
        "\n\n\n----------------Ayoo..Issue Getting the questions",
        e.message
      );
    }
  };
  const postResponse = async (patient_id) => {
    try {
      console.log("\n\n\n-----------------POST : UPDATING DB with Responses");
      console.log("Patient ID :", patient_id);
      // const resp = await jsonServer.post("/questionare_answers", responses);
      // const resp = await jsonServer.post(
      //   `patient/responses/${patient_id}`,
      //   responses,
      // );
      console.log("Responses : \n", responses);

      const resp = await jsonServer.post(
        `/patient/responses/${patient_id}`,

        responses
      );

      console.log("LOG OF RESPONSE : ", resp.data);
      //Navigate to Patient Home page

      navigation.navigate("Start");
      // if (resp.data == 5) {
      //   console.log(
      //     "Going to PATIENT HOME As Sevarity is High, Pakka doctor beku"
      //   );
      //   navigation.navigate("Start");
      //   //Navigate to Patient Home page
      // } else {
      //   // Sevarity is low so ask him if he needs a doctor
      //   navigation.navigate("ChoiceOfDoctor", { pat_id: patient_id });
      // }
    } catch (e) {
      console.log(
        "\n\n\n----------------Ayoo Some expection while Submitting the responses : ",
        e.message
      );
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={style.containerStyle}>
      <Spacer>
        <Text h3 style={{ marginBottom: 30 }}>
          Rate between 1-5
        </Text>
        <ScrollView>
          <View>
            <FlatList
              data={questions}
              keyExtractor={(question) => question.qid}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text> {item.description} : </Text>
                    <Input
                      val=""
                      keyboardType="numeric"
                      onChangeText={(newVal) => {
                        if (newVal >= 1 && newVal <= 5) {
                          setError("");
                          setRespose(updateResponse(item.qid, newVal));
                        } else setError("Please enter in the range 1-5");
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        {error ? (
          <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>
        ) : null}
        {/* <Button
        style={style.buttonStyle}
        title="Submit"
        onPress={() => {
          postResponse(patient_id, () => {
            navigation.navigate("PatientHome");
          });
        }}
      /> */}
        <Button
          title="Submit"
          onPress={() => {
            postResponse(patient_id);
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
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            alignSelf: "center",
            marginVertical: 20,
          }}
        />
      </Spacer>
    </View>
  );
};

const style = StyleSheet.create({
  entryStyle: {
    flexDirection: "row",
    marginLeft: 42,
    marginVertical: 15,
    alignContent: "center",
  },
  inputBoxStyle: {
    borderWidth: 3,
    borderColor: "grey",
    marginRight: 30,
    paddingTop: 5,
    paddingLeft: 8,
  },
  textBoxStyle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  headerStyle: {
    marginVertical: 14,
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  buttonStyle: {
    marginTop: 100,
    alignSelf: "flex-end",
  },
  containerStyle: {
    //  backgroundColor: "#d2d3fe",
    marginVertical: 40,
    marginTop: 100,
    flex: 1,
  },
});

RegistrationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default RegistrationScreen;

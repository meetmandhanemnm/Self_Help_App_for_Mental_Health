import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import jsonServer from "../../api/jsonServer";
import { Context as PatientContext } from "../context/patientContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getPassToken,
  getToken,
  getUsnToken,
  setToken,
  validateUsnPassToken,
  setUsnPassToken,
  removeUsnPassToken,
  removeToken,
  tokenAvaliable,
  getOfflineData,
  storeOfflineData,
  removeOfflineData,
} from "../offlineStorage/1_Token";

// import BackgroundImg from "../components/BackGroundImage";

// const setToken = async () => {
//   try {
//     console.log("())()()()(()()()() SEtting TOken ");
//     await AsyncStorage.setItem("token", "1222333333333333333");
//   } catch (e) {
//     console.log(" )))))))))))))))))))))))))))))))CANT SET TOKEN");
//   }
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

const StartScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addPatient, addDoctor, addToken } = useContext(PatientContext);

  const validateToken = async () => {
    console.log("\n\n\t >>>>>>>>> validationToken()");
    const jwtt = await tokenAvaliable();
    if (jwtt) {
      // if (await getOfflineData("token")) {
      console.log("\t\t Hurray! Direct Signin", jwtt);
      //Get patient data from local storage

      storeTokenReducer(jwtt);
      storePatientDetailsReducer(await getOfflineData("patient_data"));
      storageDoctorDetailsReducer(await getOfflineData("doctor_data"));
      console.log(
        "\n\n\t Navigating to Patient HOme Directly \n Getting Patient DEtails from Offline"
      );
      //Goto PatientHome
      navigation.navigate("PatientHome");
    } else {
      console.log("\t\tNo Token Avaliable...Please Sign in");
      //Signup Page with Setting a new token
    }
    //removeToken();
    //setToken();
  };

  const onSubmit = async (email, password, setErrorMessage, callback) => {
    //const [pat_det, setPatientDet] = useState("");
    console.log("\n\t\t((((((((((( LOGIN )))))))))))))))))))))");
    try {
      // const response = await jsonServer.post(`/patient/login`, {
      //   username: email,
      //   password: password,
      // });
      const response = await jsonServer.post(`/api/auth/login/patient`, {
        username: email,
        password: password,
      });
      const jwt = response.headers.jwt;
      storeOfflineData("token", jwt);
      storeTokenReducer(jwt);

      const pat_det = response.data;
      // console.log("\n\n------------- Pring Pat_det in LoginScreen");
      // console.log(pat_det);
      // setUsnPassToken(email, password);

      //Store Patient Data in Reducer
      storePatientDetailsReducer(pat_det);

      //Get Doctor name
      console.log(" DOCCTOR ID : ", response.data["d_id"]);

      //If Doctor Exists
      if (pat_det.d_id) {
        const doctor_resp = await jsonServer
          .get(`/doctor/${response.data["d_id"]}`)
          .catch((err) => {
            console.log(
              "\n\t Ayoo : Error Retriving Doctor Name ",
              err.message
            );
          });
        //Store Doctor in Reducer

        storageDoctorDetailsReducer(doctor_resp.data);
      }

      //To StorePatientDetails Offline
      try {
        storeOfflineData("patient_data", JSON.stringify(pat_det));
        //getOfflineData("patient_data");

        //Storing Doctor Data offline:
        if (pat_det.d_id)
          storeOfflineData("doctor_data", JSON.stringify(doctor_resp.data));
        // getOfflineData("doctor_data");

        // removeOfflineData("tokeen");
      } catch (err) {
        console.log(" \n\t\t Ayooo : Issue Storing Data ", err.message);
      }
      //Setting Token for SSO in the future
      //    setToken();
      setErrorMessage("");
      callback(pat_det);

      // console.log("\n\n\n-----------------POST : Getting Patient Detials");

      // console.log(response.data);
    } catch (e) {
      setErrorMessage("Oppssss!!! Something went wrong..Try Again");
      console.log("\n\n\n----------------Ayoo..Issue Getting the Details");
      console.log(e.message);
    }
  };

  const storePatientDetailsReducer = (pat_det) => {
    addPatient(pat_det);
  };
  const storageDoctorDetailsReducer = (doc_det) => {
    console.log("\n\t Storing Doctor Detials : ", doc_det);
    addDoctor(doc_det);
  };
  const storeTokenReducer = (token) => {
    console.log("\n\t Store Token Details : ", token);
    addToken(token);
  };

  useEffect(() => {
    validateToken();
  }, []);

  // if (validateUsnPassToken()) {
  //   setEmail(getUsnToken());
  //   setPassword(getPassToken());
  //   onSubmit(email, password, setErrorMessage, (patient_det) =>
  //     navigation.navigate("PatientHome", { pat_det: patient_det })
  //   );
  //   return <View></View>;
  // }
  return (
    <>
      <View style={style.containerStyle}>
        <Spacer>
          <Image
            style={style.imageStyle}
            source={require("../../images/happyBrain.png")}
          />
          <Text h4 style={{ textAlign: "center" }}>
            Welcome to your Welness Destination!!
          </Text>
          <Spacer />
          <Spacer>
            <Input
              label="Username"
              value={email}
              onChangeText={(newEmail) => setEmail(newEmail)}
              autoCapitalize="none"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={(newPass) => setPassword(newPass)}
              autoCapitalize="none"
              secureTextEntry={true}
            />

            {errorMessage ? (
              <Text style={style.errorMessageStyle}>{errorMessage}</Text>
            ) : null}

            <Button
              title="Log in"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "rgba(111, 202, 186, 1)",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 50,
                height: 50,
                width: 200,

                alignSelf: "center",
              }}
              onPress={() => {
                console.log(email, password);
                onSubmit(email, password, setErrorMessage, (patient_det) =>
                  navigation.navigate("PatientHome", { pat_det: patient_det })
                );
              }}
            />
          </Spacer>

          <TouchableOpacity onPress={() => navigation.navigate("PersonalDet")}>
            <Text style={style.linkStyle}>No Account? Signup here</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text style={style.linkStyle2}>
              Forgot Username/ Password? Click here
            </Text>
          </TouchableOpacity>
          {/* <Button
            title="Chat"
            loadingProps={{ size: "small", color: "white" }}
            buttonStyle={{
              backgroundColor: "rgba(111, 202, 186, 1)",
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: "bold", fontSize: 23 }}
            containerStyle={{
              marginHorizontal: 10,
              height: 50,
              width: 110,
              marginBottom: 10,
              alignSelf: "center",
            }}
            onPress={() => {
              navigation.navigate("Chat");
            }}
          /> */}
        </Spacer>
      </View>
    </>
  );
};
StartScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyle: {},
  linkStyle: { textAlign: "center", marginTop: 30, color: "blue" },
  linkStyle2: { textAlign: "center", marginTop: 20, color: "blue" },

  imageStyle: {
    alignSelf: "center",
    marginBottom: 40,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "rgba(111, 202, 186, 1)",
  },
  errorMessageStyle: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 14,
  },

  loginButStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "grey",
    marginHorizontal: 40,
    marginTop: 90,
    borderCurve: 0.5,
    opacity: 0.8,
  },
  registerButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "grey",

    marginHorizontal: 40,
    marginVertical: 20,
    borderCurve: 50,
    opacity: 0.8,
  },
  textStyle: {
    fontSize: 18,
    marginVertical: 20,
    alignSelf: "center",
    fontStyle: "bold",
    color: "white",
  },
  backgroundImage: {
    //   flex: 1,
    alignSelf: "stretch",
    width: null,
    height: 750,
    alignContent: "center",
  },
  viewStyle: {
    alignItems: "center",
    alignContent: "",
  },
  headerStyle: {
    marginTop: 150,
    fontSize: 23,
    alignSelf: "center",

    fontStyle: "bold",
    color: "white",
    fontWeight: "bold",
  },
});
export default StartScreen;

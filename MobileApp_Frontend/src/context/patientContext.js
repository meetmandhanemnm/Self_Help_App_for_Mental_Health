import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const workOutReducer = (state, action) => {
//   // reducer fun
//   switch (action.type) {
//     case "addworkout":
//       return { ...state, errorMessage: action.payload };

//     default:
//       return state;
//   }
// };
const patientReducer = (state, action) => {
  switch (action.type) {
    case "add_patient":
      return {
        ...state,
        // pat_name: action.payload.pat_name,
        // pat_id: action.payload.pat_id,
        patient_data: action.payload,
      };
    case "add_workout":
      return {
        ...state,
        workout_data: action.payload,
      };
    case "update_prereq":
      // state.workout_data.map((workout) => {});
      return state;
    case "update_workout_status":
      //  state.workout_data.map((workout) => { (workout.workout_instance_id==action.payload)?
      //    {workout.completed = true}:workout})
      return state;

    //return state;
    case "add_doctor":
      return { ...state, doctor_data: action.payload };
    case "add_token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const addPatient = (dispatch) => {
  return async (patient_data) => {
    //Trying to signin
    //Handel success by updating state
    //Handling error
    try {
      // console.log(
      //   "\n\n==================== REDUCER :addPatient() \n Patient data recieved :  ",
      //   patient_data
      // );

      dispatch({
        type: "add_patient",
        payload: patient_data,
      });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };
};

const addWorkout = (dispatch) => {
  return async (workout_data) => {
    try {
      // console.log(
      //   "\n\n=====================  REDUCER : addWorkout() \n workout Data Recieved:",
      //   workout_data
      // );

      dispatch({
        type: "add_workout",
        payload: workout_data,
      });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };
};
const addDoctor = (dispatch) => {
  return async (doctor_data) => {
    try {
      console.log(
        "\n\n=====================  REDUCER : addWorkout() \n DOCTOR Data Recieved:",
        doctor_data
      );

      dispatch({
        type: "add_doctor",
        payload: doctor_data,
      });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };
};
const addToken = (dispatch) => {
  return async (token) => {
    try {
      console.log(
        "\n\n=====================  REDUCER : addToken() \n TOKEN Recieved:",
        token
      );

      dispatch({
        type: "add_token",
        payload: token,
      });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };
};
const updatePreReqWorkout = (dispatch) => {
  return async (workout_instance_id) => {
    try {
      // console.log("\n------Update Pre Req----------");
      dispatch({
        type: "update_prereq",
        payload: workout_instance_id,
      });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };
};

const updateWorkoutStatus = (dispatch) => {
  return async (workout_instance_id) => {
    try {
      //   console.log("\n------Update Workout Status----------");
      dispatch({
        type: "update_workout_status",
        payload: workout_instance_id,
      });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };
};

// const clearErrorMessage = (dispatch) => () => {
//   dispatch({ type: "clear_error_message" });
// };
// const signup = (dispatch) => {
//   return async ({ email, password }) => {
//     //make api req to signup with email and pass
//     //if signup change state
//     //if signing up fails, reflect errror message
//     try {
//       console.log("------ IN Signup");

//       const response = await trackerAPI.post("/signup", { email, password });
//       await AsyncStorage.setItem("token", response.data.token); // Store the token
//       dispatch({ type: "signin", payload: response.data.token });

//       //Navigate to main flow
//       //We can use callback in fun params like before also
//       navigate("TrackList");
//     } catch (err) {
//       console.log(err.message);
//       // console.log(err.response.data);
//       dispatch({
//         type: "add_error",
//         payload: "Something went wrong with Signup",
//       });
//     }
//   };
// };
// const signin = (dispatch) => {
//   return async ({ email, password }) => {
//     //Trying to signin
//     //Handel success by updating state
//     //Handling error
//     try {
//       console.log("\n------SIGNIN----------");

//       const response = await trackerAPI.post("/signin", { email, password });
//       await AsyncStorage.setItem("token", response.data.token);
//       dispatch({ type: "signin", payload: response.data.token });
//       console.log(" Logged In Successfully");
//       navigate("TrackList");
//     } catch (err) {
//       console.log("Error : ", err.message);
//       dispatch({
//         type: "add_error",
//         payload: "Something went wrong with signin",
//       });
//     }
//   };
// };

// const signout = (dispatch) => {
//   return async () => {
//     //signout
//     //Remove the token in Asynch Storage
//     await AsyncStorage.removeItem("token");
//     dispatch({ type: "signout" });
//     navigate("loginFlow");
//   };
// };
// const tryLocalSignin = (dispatch) => async () => {
//   // For autosigin
//   const token = await AsyncStorage.getItem("token");
//   console.log(
//     "All avaliable Cache storage : ",
//     await AsyncStorage.getAllKeys()
//   );
//   if (token) {
//     dispatch({ type: "signin", payload: token });
//     navigate("TrackList");
//   } else {
//     navigate("loginFlow");
//   }
// };

export const { Provider, Context } = createDataContext(
  patientReducer,
  { addPatient, addWorkout, updatePreReqWorkout, addDoctor, addToken },

  { patient_data: "", workout_data: "", doctor_data: "", token: "" }
);

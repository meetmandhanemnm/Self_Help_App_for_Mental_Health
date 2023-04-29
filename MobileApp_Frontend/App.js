import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartScreen from "./src/screen/1_StartScreen";
import RegistrationScreen from "./src/screen/1.2_RegistrationScreen";
import PersonalDetailsRegistration from "./src/screen/1.1_PersonalDetailsRegistration";
import PatientHome from "./src/screen/2_PatientHome";
import QuestionsScreen from "./src/screen/2.1_QuestionsScreen";
import InitScreen from "./src/screen/0_InitScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Example from "./src/screen/4_ChatScreen";
import AccountScreen from "./src/screen/3_AccountScreen";
import { setNavigator } from "./src/navigateRef";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PatientContext } from "./src/context/patientContext";
import ChoiceofDoctor from "./src/screen/1.3_ChoiceofDoctor";
import ForgotPassword from "./src/screen/1.4_ForgotPassword";

// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// const Tab = createMaterialBottomTabNavigator();

// export default function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={StartScreen} />
//       <Tab.Screen name="Settings" component={PatientHome} />
//     </Tab.Navigator>
//   );
// }
// const HomeStack = createStackNavigator();
// function MyHomeStack() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Start" component={StartScreen} />
//     </HomeStack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <HomeStack />
//     </NavigationContainer>
//   );
// }
// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={StartScreen}
//         options={{
//           headerTintColor: "white",
//           headerStyle: { backgroundColor: "tomato" },
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={PatientHome}
//         options={{ headerStyleInterpolator: forFade }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }
/////////////////////////////////////

// function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate("Profile")}
//       />
//     </View>
//   );
// }

// function Profile({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile screen</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const forFade = ({ current, next }) => {
//   const opacity = Animated.add(
//     current.progress,
//     next ? next.progress : 0
//   ).interpolate({
//     inputRange: [0, 1, 2],
//     outputRange: [0, 1, 0],
//   });

//   return {
//     leftButtonStyle: { opacity },
//     rightButtonStyle: { opacity },
//     titleStyle: { opacity },
//     backgroundStyle: { opacity },
//   };
// };

// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerTintColor: "white",
//           headerStyle: { backgroundColor: "tomato" },
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{ headerStyleInterpolator: forFade }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }

////////////////////////////////////
// import PushNotification, {
//   PushNotificationIOS,
// } from "react-native-push-notification";
// import React, { useEffect } from "react";
// const now = new Date();
// const oneMinuteLater = new Date(now.getTime() + 60000); // add 1 minute (60,000 ms) to current time

const navigator = createStackNavigator(
  {
    Init: InitScreen,
    Start: StartScreen,
    Register: RegistrationScreen,
    PersonalDet: PersonalDetailsRegistration,
    PatientHome: PatientHome,
    Questions: QuestionsScreen,
    ChoiceOfDoctor: ChoiceofDoctor,
    Account: AccountScreen,
    Chat: Example,
    Forgot: ForgotPassword,
  },
  { initialRouteName: "Start" }
);
// export default createAppContainer(navigator);

const App = createAppContainer(navigator);

export default () => {
  // useEffect(() => {
  //   PushNotification.requestPermissions();
  //   PushNotification.configure({
  //     onNotification: (notification) => {
  //       console.log(notification);
  //     },
  //   });
  // }, []);
  // PushNotification.localNotificationSchedule({
  //   message: "Reminder: App is idle. Please open to continue using.",
  //   date: oneMinuteLater, // start the notification one minute from now
  //   repeatType: "minute",
  // });
  return (
    <PatientContext>
      <App />
      {/*In the Blog Provider, the children prop is hte <App>*/}
    </PatientContext>
  );
};

// // const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Start} />
//       <Tab.Screen name="Settings" component={Register} />
//     </Tab.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Start} />
//         <Tab.Screen name="Settings" component={Register} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const navigator = createSwitchNavigator({
//   InitialScreen: StartScreen,
//   loginFlow: createStackNavigator({
//     Start: StartScreen,
//     Register: RegistrationScreen,
//     PersonalDet: PersonalDetailsRegistration,
//     Questions: QuestionsScreen,
//   }),
//   mainFlow: createMaterialBottomTabNavigator({
//     Account: AccountScreen,
//     WorkoutList: createStackNavigator({
//       PatientHome: PatientHome,
//       Questions: QuestionsScreen,
//     }),
//     Chat: ChatScreen,
//   }),
// });

// const App = createAppContainer(navigator);
// export default () => {
//   return (
//     <App
//       ref={(navigator) => {
//         setNavigator(navigator);
//       }}
//     />
//   );
// };

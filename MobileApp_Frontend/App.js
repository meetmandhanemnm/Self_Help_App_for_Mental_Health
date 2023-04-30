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
// import registerNNPushToken from "native-notify";
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

const AppC = createAppContainer(navigator);

export default function App() {
  //registerNNPushToken(123, "wDN7Drh1sdRsg6rE11FAVz");
  return (
    <PatientContext>
      <AppC />
      {/*In the Patient Provider, the children prop is hte <App>*/}
    </PatientContext>
  );
}

//7*&*&*&*&*&&*&*&*

// import { useState, useEffect, useRef } from "react";
// import { Text, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// const navigator = createStackNavigator(
//   {
//     Init: InitScreen,
//     Start: StartScreen,
//     Register: RegistrationScreen,
//     PersonalDet: PersonalDetailsRegistration,
//     PatientHome: PatientHome,
//     Questions: QuestionsScreen,
//     ChoiceOfDoctor: ChoiceofDoctor,
//     Account: AccountScreen,
//     Chat: Example,
//     Forgot: ForgotPassword,
//   },
//   { initialRouteName: "Start" }
// );

// const AppContainer = createAppContainer(navigator);

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();
//   const lastInteractionTime = useRef(Date.now());

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     const intervalId = setInterval(() => {
//       const now = Date.now();
//       if (now - lastInteractionTime.current > 5000) {
//         schedulePushNotification();
//       }
//     }, 1000);

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//       clearInterval(intervalId);
//     };
//   }, []);

//   const handleInteraction = () => {
//     lastInteractionTime.current = Date.now();
//   };

//   return (
//     <PatientContext>
//       <AppContainer
//         onNavigationStateChange={(prevState, currentState) => {
//           handleInteraction();
//         }}
//       />
//     </PatientContext>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've been inactive for 5 seconds",
//       body: "Please check back in",
//       data: { data: "goes here" },
//     },
//     trigger: null,
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }
//   return token;
// }

//*&*&*&*&*&*&

//'''''''''''''''''''''''''''''''''' WORKING

// import { useState, useEffect, useRef } from "react";
// import { Text, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// const navigator = createStackNavigator(
//   {
//     Init: InitScreen,
//     Start: StartScreen,
//     Register: RegistrationScreen,
//     PersonalDet: PersonalDetailsRegistration,
//     PatientHome: PatientHome,
//     Questions: QuestionsScreen,
//     ChoiceOfDoctor: ChoiceofDoctor,
//     Account: AccountScreen,
//     Chat: Example,
//     Forgot: ForgotPassword,
//   },
//   { initialRouteName: "Start" }
// );

// const AppContainer = createAppContainer(navigator);

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   useEffect(() => {
//     const backgroundTask = async () => {
//       const notifications =
//         await Notifications.getAllScheduledNotificationsAsync();
//       if (notifications.length === 0) {
//         await schedulePushNotification();
//       }
//     };
//     const timeout = setTimeout(backgroundTask, 5000);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <PatientContext>
//       <AppContainer />
//     </PatientContext>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

///>>>>>>>>>>>>>>>>>>>>>

//''''''''''''''''''''''''''''''

//********************************************** */ WORKING __________________________
// import { useState, useEffect, useRef } from "react";
// import { Text, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// const InactivityThreshold = 5; // seconds
// let lastActiveTime = Date.now();

// const AppNavigator = createStackNavigator(
//   {
//     Init: InitScreen,
//     Start: StartScreen,
//     Register: RegistrationScreen,
//     PersonalDet: PersonalDetailsRegistration,
//     PatientHome: PatientHome,
//     Questions: QuestionsScreen,
//     ChoiceOfDoctor: ChoiceofDoctor,
//     Account: AccountScreen,
//     Chat: Example,
//     Forgot: ForgotPassword,
//   },
//   { initialRouteName: "Start" }
// );

// const AppContainer = createAppContainer(AppNavigator);

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (Date.now() - lastActiveTime > InactivityThreshold * 1000) {
//         schedulePushNotification();
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const onActivity = () => {
//     lastActiveTime = Date.now();
//   };

//   return (
//     <PatientContext>
//       <AppContainer />
//       {/*In the Patient Provider, the children prop is hte <App>*/}
//     </PatientContext>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Hey there!",
//       body: "It's been a while since you've used the app.",
//     },
//     trigger: null,
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

//*********************************************** */
/////////////////////////////////%%%%%%%%%%%
// import { useState, useEffect, useRef } from "react";
// import { Text, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   useEffect(() => {
//     const backgroundTask = async () => {
//       const notifications =
//         await Notifications.getAllScheduledNotificationsAsync();
//       if (notifications.length === 0) {
//         await schedulePushNotification();
//       }
//     };
//     const timeout = setTimeout(backgroundTask, 5000);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: "center", justifyContent: "center" }}>
//         <Text>
//           Title: {notification && notification.request.content.title}{" "}
//         </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>
//           Data:{" "}
//           {notification && JSON.stringify(notification.request.content.data)}
//         </Text>
//       </View>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

////////%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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

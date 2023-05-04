import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const setToken = async () => {
  try {
    console.log("\n\n\t\t }} setToken()");
    await AsyncStorage.setItem("token", "11111000000");
  } catch (e) {
    console.log(" )))))))))))))))))))))))))))))))CANT SET TOKEN");
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token").then((token) =>
      console.log(" ======= TOKEN VALUE : getToken() ", token)
    );
    return JSON.parse(token);
  } catch (e) {
    console.log("\n\n :(:(:(:(:(:( NO TOKEN");
    return -1;
  }
};
const tokenAvaliable = async () => {
  try {
    console.log("\n\n\t\t }} tokenAvaliable() ");
    const token = await AsyncStorage.getItem("token");
    console.log(" ======= TOKEN VALUE : ", token);

    if (token) return token;
    else return false;
  } catch (e) {
    console.log("\n\n :(:(:(:(:(:( NO TOKEN \n", e.message);
    return false;
  }
};
const removeToken = async () => {
  try {
    console.log("\n\n\t }} removeToken() ");
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log("\n\n Ayooooo :  FAILED TO REMOVE TOKEN :( ");
  }
};

const setUsnPassToken = async (usn, pass) => {
  try {
    console.log("())()()()(()()()() SEtting TOken ");
    await AsyncStorage.setItem("usn", usn);
    await AsyncStorage.setItem("pass", pass);
  } catch (e) {
    console.log(" )))))))))))))))))))))))))))))))CANT SET USN PASS TOKEN");
  }
};
const validateUsnPassToken = async () => {
  try {
    const userT = await AsyncStorage.getItem("usn").then((token) =>
      console.log("Toeknnnn Username ()()()(  ===========", token)
    );
    const passT = await AsyncStorage.getItem("pass").then((token) =>
      console.log("Toeknnnn Pass ()()()(  ===========", token)
    );
    if (userT && passT) return true;
    else return false;
  } catch (e) {
    console.log(
      "\n\n(((((((((((((((((((((((((((()))))))))) Error Retreving Token Values"
    );
    return false;
  }
};

const removeUsnPassToken = async () => {
  try {
    await AsyncStorage.removeItem("usn").then((token) =>
      console.log("((((((((((((((((( usn T  REMOVED )))))))))))))))))")
    );

    await AsyncStorage.removeItem("pass").then((token) =>
      console.log("((((((((((((((((( pass T  REMOVED )))))))))))))))))")
    );
  } catch (e) {
    console.log(
      "\n\n(((((((((((((((((((((((((((()))))))))) FAILED TO REMOVE USN PASS TOKEN :( "
    );
  }
};
const getUsnToken = async () => {
  try {
    const token = await AsyncStorage.getItem("usn").then((token) =>
      console.log("Usn Token  ()()()(  ===========", token)
    );
    return token;
  } catch (e) {
    console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO usn");
  }
};
const getPassToken = async () => {
  try {
    const token = await AsyncStorage.getItem("pass").then((token) =>
      console.log("pass ()()()(  ===========", token)
    );
    return token;
  } catch (e) {
    console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO pass");
  }
};

const storeOfflineData = async (token, value) => {
  console.log("\n\n\t\t }}}  storeOfflineData()  {{{   : ", token);
  try {
    await AsyncStorage.setItem(token, value);
  } catch (e) {
    console.log(`\n\n\t Ayooo  : Cant Set token ${token}`);
  }
};
const getOfflineData = async (token_key) => {
  console.log("\n\n\t\t }}}  getOfflineData()  {{{  : ", token_key);
  try {
    const offlineData = await AsyncStorage.getItem(token_key);
    console.log(
      "\n\t ========== Data Retrieved from Offline : \n",
      JSON.parse(offlineData)
    );
    return JSON.parse(offlineData);
  } catch (err) {
    console.log(`\n\n\t Ayoo : Cannot retrieve ${token_key}`);
    return null;
  }
};

const removeOfflineData = async (token_key) => {
  console.log("\n\n\t\t }}}  removeOffliceData()  {{{   : ", token_key);

  try {
    await AsyncStorage.removeItem(token_key);
  } catch (e) {
    console.log(`\n\n\t Ayoo : Cannot Remove token ${token_key}`);
  }
};

export {
  setToken,
  getToken,
  removeToken,
  setUsnPassToken,
  removeUsnPassToken,
  validateUsnPassToken,
  getUsnToken,
  getPassToken,
  tokenAvaliable,
  storeOfflineData,
  getOfflineData,
  removeOfflineData,
};

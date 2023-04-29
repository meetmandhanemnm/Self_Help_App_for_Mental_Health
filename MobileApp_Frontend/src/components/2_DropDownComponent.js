import React from "react";
import { View, InputText, StyleSheet } from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const DropDownComponent = ({
  workout_title,
  workout_description,
  workout_status,
  expandable,
  onPress,
  goToQuestions,
  questions,
  preReqId,
}) => {
  console.disableYellowBox = true;

  return (
    <View style={style.containerStyle}>
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: 18,

                color: workout_status ? "green" : "black",
                marginLeft: 14,
              }}
            >
              {workout_title}
            </ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandable}
        onPress={() => {
          onPress();
        }}
      >
        <ListItem>
          {/* <Avatar
            size={64}
            rounded
            icon={{ name: "pencil", type: "font-awesome" }}
            containerStyle={{ backgroundColor: "#87CEEB" }}
          /> */}
          <Entypo name="open-book" size={24} color="#87CEEB" />
          <ListItem.Content>
            <ListItem.Title>Description</ListItem.Title>
            <ListItem.Subtitle>{workout_description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          {/* <Avatar
            size={64}
            rounded
            icon={{ name: "question", type: "font-awesome" }}
            containerStyle={{ backgroundColor: "#5F9EA0" }}
          /> */}
          {workout_status ? (
            <Ionicons name="checkmark-done" size={24} color="black" />
          ) : (
            <MaterialCommunityIcons
              name="timer-sand-complete"
              size={24}
              color="red"
            />
          )}

          <ListItem.Content>
            <ListItem.Title>Workout Status</ListItem.Title>
            <ListItem.Subtitle>
              {workout_status ? "Completed" : "Pending.."}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <TouchableOpacity onPress={() => goToQuestions()}>
          <ListItem>
            <Feather name="pen-tool" size={24} color="#5F9EA0" />
            <ListItem.Content>
              <ListItem.Title>Questions</ListItem.Title>
              <ListItem.Subtitle>{"click here"}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </ListItem.Accordion>
    </View>
  );
};

const style = StyleSheet.create({});
export default DropDownComponent;

import React from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const BackgroundImg = (props) => {
  // return (
  //   <View>
  //     {/* <ImageBackground
  //       source={props.imageSource}
  //       resizeMode="stretch"
  //       style={styles.img}
  //     >
  //       {/* <TextInput placeholder="Geeks for Geeks" style={styles.input} /> */}
  //     {/* </ImageBackground> */}
  //     <Image source={props.imageSource} />
  //   </View>
  // );
  // return (
  //   <View>
  //     <Image
  //       source={require("./../../../images/buddha1.jpg")}
  //       style={styles.backgroundImage}
  //     >
  //       <View>
  //         <Text>All your stuff</Text>
  //       </View>
  //     </Image>
  //   </View>
  // );
  return (
    <View>
      {" "}
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("./../../images/buddha1.png")}
      >
        //place your now nested component JSX code here
      </ImageBackground>
      ;
    </View>
  );
};

export default BackgroundImg;

const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    bac,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
  // backgroundImage: {
  //   flex: 1,
  //   alignSelf: "stretch",
  //   width: null,
  // },
  backgroundImage: {
    flex: 1,
    // width: undefined,
    // height: undefined,
    // flexDirection: 'column',
    // backgroundColor:'transparent',
    // justifyContent: 'flex-start',
  },
});

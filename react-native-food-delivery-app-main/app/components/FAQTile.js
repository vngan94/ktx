import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Animated } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Octicons } from "@expo/vector-icons";
const FAQTile = ({ item, index }) => {
  const [isClick, setisClick] = useState(false);
  const handleOnPress = () => {
    setisClick(!isClick);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleOnPress(item)}
      >
        <View style={styles.index}>
          <Text>{index + 1} </Text>
        </View>

        <View>
          <Text style={styles.question}>{item.question} </Text>
        </View>
        {isClick ? (
          <View style={styles.box2}>
            <AntDesign name="up" size={18} color={COLORS.gray} />
          </View>
        ) : (
          <View style={styles.box}>
            <AntDesign name="down" size={18} color={COLORS.gray} />
          </View>
        )}
      </TouchableOpacity>
      {isClick && (
        <TouchableOpacity
          style={styles.container2}
          onPress={() => handleOnPress(item)}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Octicons name="triangle-right" size={20} color="black" />
            <Text style={styles.answer}>{item.answer} </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
    // <TouchableOpacity style={styles.container} onPress={handleOnPress}>
    //   <View style={styles.index}>
    //     <Text>{index + 1} </Text>
    //   </View>

    //   <View>
    //     <Text style={styles.question}>{item.question} </Text>
    //   </View>
    //   {isClick ? (
    //     <View style={styles.box2}>
    //       <AntDesign name="up" size={18} color={COLORS.gray} />
    //       {/* <Collapsible collapsed={true}>
    //         <View>
    //           <Text>Answer</Text>
    //         </View>
    //       </Collapsible> */}
    //       ;
    //     </View>
    //   ) : (
    //     <View style={styles.box}>
    //       <AntDesign name="down" size={18} color={COLORS.gray} />
    //     </View>
    //   )}
    // </TouchableOpacity>
  );
};

export default FAQTile;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: COLORS.secondary1,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container2: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    marginTop: -10,
  },
  question: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
    width: 280,
  },
  reply: {
    fontFamily: "bold",
    fontSize: 14,
    color: COLORS.black,
    width: 280,
  },
  answer: {
    marginLeft: 5,
    fontFamily: "small",
    fontSize: 14,
    color: COLORS.black,
  },
  index: {
    backgroundColor: COLORS.secondary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: COLORS.white,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    backgroundColor: COLORS.primary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const AppBar = ({ title, icon, onPress, onPress2 }) => {
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.box} onPress={onPress}>
        <AntDesign name="left" size={26}></AntDesign>
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>

      <TouchableOpacity style={icon ? styles.box : ""} onPress={onPress2}>
        <Feather name={icon} size={26} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  box: {
    backgroundColor: COLORS.primary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginHorizontal: 10,
    fontSize: SIZES.large,

    fontFamily: "medium",
    color: COLORS.black,
  },
});

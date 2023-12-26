import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

const Button = ({ title, onPress, isValid, loader, height }) => {
  
  return (
    <TouchableOpacity
    disabled={!isValid}
      onPress={onPress}
      style={styles.btnStyle(!isValid ?  COLORS.gray: COLORS.primary, !height ? 45: 40)}
    >
      {!loader  ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: (backgroundColor, height) => ({
    height: height,
    width: "100%",
    marginVertical: 15,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});

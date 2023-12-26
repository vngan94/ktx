import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants/theme";
import { AntDesign } from "@expo/vector-icons";

const InfoComponent = () => {
  return (
    <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginVertical: 10,
    }}
  >
    <View>
      <Text style={styles.title}>Số điện thoại liên hệ</Text>
      <Text style={styles.text}>0395442149</Text>
    </View>
    <AntDesign name="right" size={18} color={COLORS.gray} />
  </View>
  );
};

export default InfoComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
    width: 280,
  },
  answer: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.gray,
  },
  index: {
    fontFamily: "bold",
    fontSize: 15,
    color: COLORS.black,
    height: 50,
    width: 50,
    borderRadius: 99,
    paddingHorizontal: 19,
    paddingVertical: 12,
    backgroundColor: COLORS.secondary,

    textAlign: "center",
  },
  divider: {
    borderColor: COLORS.gray2,
    opacity: 0.7,
    borderWidth: 0.3,
    width: SIZES.width - 50,
    marginHorizontal: 5,
    marginBottom: 5,
    marginTop: 7,
  },
  outter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    flexDirection: "column",
    marginHorizontal: 20,
    alignItems: "flex-start",
    marginVertical: 6,
  },
  title: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
  },
  date: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginLeft: 10,
  },
  box: {
    //backgroundColor: COLORS.secondary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});

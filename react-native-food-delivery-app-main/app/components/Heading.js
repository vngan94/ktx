import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

const Heading = ({ heading, onPress }) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.text}>{heading}</Text>
      <TouchableOpacity onPress={onPress}>
        <Feather name="list" size={20} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 7,
    justifyContent: "space-between",
    marginRight: 16,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: "bold",
  },
});

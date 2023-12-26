import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import React from "react";
import Complaint from "../components/Complaint";
import Search from "../components/Search2";

const New = () => {
  return (
    <View>
      <Complaint status={0} keyword={""} />
    </View>
  );
};

export default New;

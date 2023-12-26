import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Complaint from "../components/Complaint";
const Accept = () => {
  return (
    <View>
      <Complaint status={2} keyword={""} />
    </View>
  );
};

export default Accept;

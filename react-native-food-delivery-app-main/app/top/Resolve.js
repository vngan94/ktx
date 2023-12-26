import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Complaint from "../components/Complaint";

const Resolve = () => {
  return (
    <View>
      <Complaint status={3} keyword={""} />
    </View>
  );
};

export default Resolve;

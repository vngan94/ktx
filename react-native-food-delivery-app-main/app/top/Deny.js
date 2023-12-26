import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Complaint from "../components/Complaint";
const Deny = () => {
  return (
    <View>
      <Complaint status={1} keyword={""} />
    </View>
  );
};

export default Deny;

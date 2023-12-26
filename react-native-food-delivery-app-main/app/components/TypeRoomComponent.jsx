import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NetworkImage from "./NetworkImage";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const TypeRoomComponent = ({ item, horizontal }) => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate("NotificationDetail", item);
  };
  return (
    <TouchableOpacity
      style={horizontal ? styles.wrapper : styles.wrapper2}
      onPress={handleOnPress}
    >
      <View style={{ height: 10 }} />
      <NetworkImage
        data={item.imageUrl}
        width={horizontal ? SIZES.width - 80 : SIZES.width - 50}
        height={SIZES.height / 5.8}
        radius={16}
      />
      <Text style={styles.heading}>Thông báo</Text>
      <Text style={styles.shortDescription}>Mô tả ngắn</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name="date-range"
          size={20}
          height={20}
          color={COLORS.gray2}
          style={{ marginRight: 5 }}
        />
        <Text style={styles.time}>22/1/2023</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TypeRoomComponent;
const styles = StyleSheet.create({
  wrapper: {
    marginTop: -10,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
  },
  wrapper2: {
    marginTop: 5,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
    marginBottom: 30,
  },
  heading: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray2,
  },
  shortDescription: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  time: {
    fontSize: SIZES.small,
    fontFamily: "small",
    color: COLORS.gray,
  },
});

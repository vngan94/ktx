import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NetworkImage from "./NetworkImage";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
const NotificationComponent = ({ item, horizontal }) => {
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
        data={item.image}
        width={horizontal ? SIZES.width - 80 : SIZES.width - 50}
        height={SIZES.height / 5.8}
        radius={16}
      />
      <View style={{ margin: 10 }}>
        <Text style={styles.heading}>
          {" "}
          {item.title.length < 40
            ? `${item.title}`
            : `${item.title.substring(0, 35)}...`}
        </Text>
        <Text style={styles.shortDescription}>
          {item.shortDescription.length < 40
            ? `${item.shortDescription}`
            : `${item.shortDescription.substring(0, 35)}...`}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {item.createdAt === item.updatedAt ? (
            <Text style={styles.time}>
              Ngày đăng:{" "}
              {moment.utc(item.createdAt).local().format("DD/MM/YYYY")}
            </Text>
          ) : (
            <Text style={styles.time}>
              Đã chỉnh sửa:{" "}
              {moment.utc(item.updatedAt).local().format("DD/MM/YYYY")}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationComponent;
const styles = StyleSheet.create({
  wrapper: {
    marginTop: -10,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 20,
  },
  wrapper2: {
    marginTop: 5,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
    marginBottom: 20,
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

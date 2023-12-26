import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import CommonUtils from "../util/CommonUtils";
import moment from "moment";
import { cancelRegister } from "../service/allService";
import { Alert } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const RegisterDetailComponent = ({ item, onPress, button }) => {
  const navigation = useNavigation();

  const handleCancel = async () => {
    let res = await cancelRegister({ id: item.id });
    res = res.data;
    if (res && res.errCode === 0) {
      Alert.alert("Hủy đơn đăng ký phòng thành công");
    }
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginBottom: 15,
      }}
    >
      <TouchableOpacity>
        <View style={styles.inner}>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={styles.heading}>
              {item.roomData.typeroomData.typeRoomName}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="place-of-worship" size={14} color="black" />
              <Text style={styles.question}>
                Phòng {item.roomData.roomName}, Khu {item.roomData && item.roomData.areaData.areaName}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="attach-money" size={18} color="red" />
              <Text style={styles.money}>
                {CommonUtils.formatter.format(
                  item.priceData.priceService + item.priceData.priceTypeRoom
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
                width: "90%",
              }}
            >
              <Text style={styles.date}>
                Ngày đăng ký:{" "}
                {moment.utc(item.createdAt).local().format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.box}>
                {item.status == 1
                  ? "Chờ duyệt"
                  : item.status == 2
                  ? "Đã duyệt"
                  : item.status == 3
                  ? "Từ chối"
                  : item.status == 4
                  ? "Đã nhận phòng"
                  : "Đã hủy"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {button === "no" ? (
                <></>
              ) : (
                <>
                  {item.status == 1 && (
                    <Button
                      title={"HỦY"}
                      isValid={true}
                      height={true}
                      onPress={handleCancel}
                    />
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterDetailComponent;

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
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.black,
  },
  text: {
    margin: 5,
    backgroundColor: COLORS.primary1,
    padding: 20,
    borderRadius: 10,
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.black,
    width: "85%",
  },
  text2: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.black,
  },
  heading: {
    marginTop: 10,
    fontFamily: "bold",
    fontSize: 16,
    color: COLORS.black,
    textAlign: "center",
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
    marginHorizontal: 20,

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
  },
  money: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.red,
  },
  box: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 20,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    fontSize: SIZES.regular,
    fontFamily: "bold",
  },
});

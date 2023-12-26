import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";
import CommonUtils from "../util/CommonUtils";

const ContractDetailComponent = ({ item, onPress }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("ContractDetailFinal", item);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
        marginBottom: 15,
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.inner}>
          <View style={{ marginVertical: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="hourglass-1" size={14} color="black" />
                <Text style={styles.question}>Bắt đầu</Text>
              </View>
              <Text style={styles.question}>
                {moment
                  .unix(+item.start / 1000)
                  .locale("vi")
                  .format("DD/MM/YYYY")}{" "}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="hourglass-3" size={14} color="black" />
                <Text style={styles.question}>Kết thúc</Text>
              </View>
              <Text style={styles.question}>
                {moment
                  .unix(+item.end / 1000)
                  .locale("vi")
                  .format("DD/MM/YYYY")}{" "}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="attach-money" size={18} color="black" />
                <Text style={styles.question2}>Tổng tiền</Text>
              </View>
              <Text style={styles.money}>
                {CommonUtils.formatter.format(item.amount)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="exclamationcircleo" size={14} color="black" />
                <Text style={styles.question3}>Trạng thái</Text>
              </View>
              <Text style={styles.box}>
                {item.status == 1
                  ? "Còn hiệu lực"
                  : item.status == 2
                  ? "Hết thời gian hợp đồng"
                  : item.status == 3 && "Bị chấm dứt do vi phạm nội quy"}
              </Text>
             
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContractDetailComponent;

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
    marginLeft: 15,
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  question2: {
    marginLeft: 8,
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  question3: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: SIZES.small,
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
    fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.red,
  },
  box: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 10,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    fontSize: SIZES.regular,
    fontFamily: "regular",
  },
});

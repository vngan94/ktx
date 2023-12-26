import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";

const ViolationComponent = ({ item, onPress }) => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(item);
  const handlePress = (screen)=> {

  navigation.navigate(screen, item)
  }
  return (
 
    <View
      style={{
        backgroundColor: COLORS.lightWhite,

        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        margin: 10,
      }}
    >
      <TouchableOpacity
        onPress={()=>handlePress("StudentViolationDetail")}
      >
        <View style={styles.outter}>
          <View style={styles.inner}>
            <Text style={styles.title}>
              {item.violationActionData.violationData.value}
            </Text>
            <View style={{ height: 10 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <MaterialIcons
                  name="format-list-numbered"
                  size={16}
                  color="black"
                />
                <Text style={styles.question}>Vi phạm lần thứ:</Text>
              </View>
              <Text style={styles.question2}>
                {item.violationActionData.times}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <SimpleLineIcons name="action-redo" size={16} color="black" />
                <Text style={styles.question}>Xử lý: </Text>
              </View>
              <Text style={styles.question3}>
                {item.violationActionData.actionData.value}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="date-range" size={16} color={COLORS.black} />

              <Text style={styles.date}>Ngày lập biên bản:</Text>

              <Text style={styles.date2}>{moment.utc(item?.createdAt).local().format("DD/MM/YYYY")}</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    </View>
  );
};

export default ViolationComponent;

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
    color: COLORS.gray,

    fontFamily: "regular",
    fontSize: SIZES.small,

    marginLeft: 10,
  },
  question2: {
    color: COLORS.black,

    fontFamily: "bold",
    fontSize: SIZES.small,

    marginLeft: 10,
  },
  question3: {
    color: COLORS.black,
    flex: 1,

    fontFamily: "regular",
    fontSize: SIZES.small,

    marginLeft: 10,
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
  date2: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.black,
    marginLeft: 10,
  },
  box: {
    backgroundColor: COLORS.secondary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});

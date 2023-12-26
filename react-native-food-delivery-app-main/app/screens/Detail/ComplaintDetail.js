import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import {
  getAllComplaintById,
  getDetailComplaintById,
} from "../../service/allService";
const ComplaintDetail = ({ navigation }) => {
  const route = useRoute();
  const [dataComplaint, setdataComplaint] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const item = route.params;
  useEffect(() => {
    fetchAllComplaint();
  }, []);

  // const getAllComplaintById = (id) => {
  //   return axios.get(
  //     `${REACT_APP_BACKEND_URL}/api/get-detail-complaint?id=${id}`
  //   );
  // };
  let fetchAllComplaint = async () => {
    let res = await getDetailComplaintById(item.id);
    res = res.data;

    if (res.data && res.errCode === 0) {
      setdataComplaint(res.data);

      if (res.data.length > 1) {
        const [, ...rest] = res.data;

        setPreviousData(rest);
      }
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 25,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            backgroundColor: COLORS.primary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontFamily: "small",
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={22} color={COLORS.white}></AntDesign>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>{item.subject}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="date-range" size={14} color={COLORS.gray} />
            <Text style={styles.date2}>
              {" "}
              {moment.utc(item.createdAt).local().format("llll")}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>
          {dataComplaint[0]?.complaintHTML}
        </Text>
        {previousData?.length > 0 &&
          previousData.map((item, index) => {
            return (
              <View style={styles.reply} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.subject}>
                    {item.employeeData.fullName}
                  </Text>
                  <View>
                    <Text style={styles.date2}>
                      {" "}
                      {moment.utc(item.updatedAt).local().format("llll")}
                    </Text>
                  </View>
                </View>
                <Text style={styles.description}>{item.responseHTML}</Text>
                <Text style={styles.description}>
                  Trạng thái:{" "}
                  {item.status == 1
                    ? "Từ chối giải quyết"
                    : item.status == 2
                    ? "Đang giải quyết"
                    : "Thành công"}
                </Text>
              </View>
            );
          })}
      </View>
    </SafeAreaView>
  );
};

export default ComplaintDetail;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 25,

    backgroundColor: COLORS.lightWhite,
    margin: 15,
    borderRadius: 12,
  },
  titleContainer: {
    backgroundColor: COLORS.lightWhite,
    height: 100,
    position: "absolute",
    top: 170,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  titleColumn: {
    padding: 15,
  },
  description: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.black,
  },
  date: {
    fontSize: 14,
    fontFamily: "small",
    color: COLORS.gray,
  },
  date2: {
    borderRadius: 9,

    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "center",
    marginLeft: 5,
  },
  shortDescription: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  heading: {
    // width: "70%",
    fontSize: SIZES.large,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subject: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.black,
  },
  reply: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: COLORS.secondary1,
    borderStyle: "solid",
    width: "90%",
    alignItems: "end",
    marginLeft: 30,
    padding: 10,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { getDetailStudentViolationById } from "../../service/allService";
import ListViolationById from "../List/ListViolationById"
import moment from "moment";
import CommonUtils from "../../util/CommonUtils";
const ContractDetailFinal = ({ navigation }) => {
  const focus = useIsFocused();
  const [userData, setuserData] = useState(null);
  const [data, setData] = useState(null);
  const route = useRoute();
  const item = route.params;

  useEffect(() => {
    fetchStudentViolation();
  }, []);

  let fetchStudentViolation = async () => {
    let res = await getDetailStudentViolationById(item.id);
    res = res.data;

    if (res && res.errCode === 0) {
      setData(res.data);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 25,
        }}
      >
        <Text style={styles.heading}>Thông tin sinh viên</Text>
        <View style={styles.wrapper3}>
          <View style={styles.wrapper4}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>Họ tên: </Text>
              <View style={{width: 10}}/>
              <Text style={styles.text}>{data?.studentData.fullName}</Text>
            </View>
          </View>
          <View style={styles.wrapper4}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>MSSV:</Text>
              <View style={{width: 10}}/>
              <Text style={styles.text}>{data?.studentData.code}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }} />
        <Text style={styles.heading}>Thông tin kỷ luật</Text>
        <View style={styles.wrapper3}>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Tên vi phạm</Text>
            <Text style={styles.text}>
              {data?.violationActionData.violationData.value}
            </Text>
          </View>

          <View style={styles.wrapper4}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>Vi phạm lần thứ: </Text>
              <View style={{width: 10}}/>
              <Text style={styles.text}>{data?.violationActionData.times}</Text>
            </View>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Xử lý</Text>
            <Text style={styles.text}>
              {data?.violationActionData.actionData.value}
            </Text>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Ghi chú</Text>
            <Text style={styles.text}>{data?.note}</Text>
          </View>

          <View style={styles.wrapper4}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>Ngày vi phạm:</Text>
              <View style={{width: 10}}/>
              <Text style={styles.dateViolation}>
                {moment
                  .unix(+data?.dateViolation / 1000)
                  .locale("vi")
                  .format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>

          <View style={styles.wrapper4}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>Ngày lập biên bản:</Text>
              <View style={{width: 10}}/>
              <Text style={styles.dateViolation}>
                {moment.utc(data?.createdAt).local().format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 15 }} />
        
        {/* <ListViolationById id={item.id} userId = {item.userId}/> */}
      </View>
    </SafeAreaView>
  );
};

export default ContractDetailFinal;

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  wrapper3: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 16,
  },
  wrapper4: { marginHorizontal: 10, marginBottom: 5 },
  box: {
    // backgroundColor: COLORS.secondary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.black,
  },
  heading2: {
    fontSize: SIZES.regular,
    fontFamily: "small",
    color: COLORS.black,
  },
  box2: {
    backgroundColor: COLORS.secondary,

    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    fontSize: SIZES.small,
    fontFamily: "small",
    color: COLORS.black,
  },
  text: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
  },
  money: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.red,
  },
  title: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.gray,
  },
});

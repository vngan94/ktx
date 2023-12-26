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

import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import RegisterDetailComponent from "../../components/RegisterDetailComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import {
  getContractById,
  getDetailRegisterByStudentId,
  getInforLiving,
} from "../../service/allService";
import moment from "moment";
import CommonUtils from "../../util/CommonUtils";
const ContractDetailFinal = ({ navigation }) => {
  const focus = useIsFocused();
  const [userData, setuserData] = useState(null);
  const [data, setData] = useState(null);
  const route = useRoute();
  const item = route.params;

  useEffect(() => {
    fetchContract();
  },[]);

  let fetchContract = async () => {
    let res = await getContractById(item.id);
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
        <Text
          style={{
            fontSize: SIZES.xLarge,
            fontFamily: "medium",
            color: COLORS.black,
            marginTop: 20,
           
          }}
        >
          Chi tiết hợp đồng
        </Text>
        <Text style={styles.heading}>Thông tin sinh viên</Text>
        <View style={styles.wrapper3}>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Họ tên</Text>
            <Text style={styles.text}>{data?.studentData.fullName}</Text>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>MSSV</Text>
            <Text style={styles.text}>{data?.studentData.code}</Text>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Số điện thoại</Text>
            <Text style={styles.text}>{data?.studentData.phonenumber}</Text>
          </View>
          {/* <View style={styles.wrapper4}>
            <Text style={styles.title}>Địa chỉ</Text>
            <Text style={styles.text}>
              {data?.studentData.address}
            </Text>
          </View> */}
        </View>
        <View  />
        <Text style={styles.heading}>Thông tin chỗ ở</Text>
        <View style={styles.wrapper3}>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Khu</Text>
            <Text style={styles.text}>{data?.roombedData.roomData.areaData.areaName}</Text>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Phòng</Text>
            <Text style={styles.text}>{data?.roombedData.roomData.roomName}</Text>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Giường</Text>
            <Text style={styles.text}>{data?.roombedData.bedData.value}</Text>
          </View>
          <View style={styles.wrapper4}>
              <Text style={styles.title}>Loại phòng</Text>
              <Text style={styles.text}>
                {data?.roombedData.roomData.typeroomData.typeRoomName}
              </Text>
            </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            
            <View style={styles.wrapper4}>
              <Text style={styles.title}>Phí dịch vụ</Text>
              <Text style={styles.money}>
              {CommonUtils.formatter.format(
               data?.priceData.priceService
              )}
                
              </Text>
            </View>
            <View style={styles.wrapper4}>
              <Text style={styles.title}>Tiền phòng</Text>
              <Text style={styles.money}>
              {CommonUtils.formatter.format(
                data?.priceData.priceTypeRoom
              )}
                
              </Text>
            </View>
            <View style={styles.wrapper4}>
              <Text style={styles.title}>Tổng</Text>
              <Text style={styles.money}>
              {CommonUtils.formatter.format(
                data?.amount
              )}
             
              </Text>
            </View>
          </View>
          

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.wrapper4}>
              <Text style={styles.title}>Ngày bắt đầu</Text>
              <Text style={styles.text}>
                {moment.unix(+data?.start / 1000).locale('vi').format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.wrapper4}>
              <Text style={styles.title}>Ngày kết thúc</Text>
              <Text style={styles.text}>
              {moment.unix(+data?.end / 1000).locale('vi').format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
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

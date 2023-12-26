import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import RegisterDetailComponent from "../../components/RegisterDetailComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import {
  getDetailRegisterByStudentId,
  getInforLiving,
} from "../../service/allService";
import moment from "moment";
const InfoLiving = ({ navigation }) => {
  const focus = useIsFocused();

  const route = useRoute();
  const item = route.params;
  const [registerData, setRegisterData] = useState(null);
  const [count, setCount] = useState(0);
  const [isClick, setisClick] = useState(false);
  const [isDefault, setisDefault] = useState(true);

  useEffect(() => {
    fetchDetailRegisterByStudentId();
  },[]);
  let fetchDetailRegisterByStudentId = async () => {
    let res = await getDetailRegisterByStudentId(item.id);
    res = res.data;

    if (res && res.errCode === 0) {
    
      setRegisterData(res.data);
      setCount(res.count);
    }
  };
  const ascending = () => {
    return registerData?.sort((a, b) => Number(a.id) - Number(b.id));
  };
  const descending = () => {
    return registerData?.sort((a, b) => Number(b.id) - Number(a.id));
  };

  const handleOnpress = () => {
    setisClick(!isClick);
    setisDefault(false);
    if (isClick) {
      setRegisterData(descending)
      ToastAndroid.show("Sắp xếp theo thời gian giảm dần!", ToastAndroid.SHORT);
    } else {
      setRegisterData(ascending)
      ToastAndroid.show("Sắp xếp theo thời gian tăng dần!", ToastAndroid.SHORT);
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
          Danh sách đơn đăng ký phòng
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 0,
          marginLeft: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text2}>Tổng số:</Text>
          <Text style={styles.box2}>{count }</Text>
        </View>
        <View />

        <View
          style={{
            flexDirection: "row",
            marginRight: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.text3}>Thời gian</Text>
          <TouchableOpacity onPress={handleOnpress}>
            <AntDesign
              // onPress={}
              name={isClick ? "arrowup" : "arrowdown"}
              size={16}
              style={isClick ? styles.box : styles.box3}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 15,
          borderRadius: 12,
          marginBottom: 300,
        }}
      >
        <FlatList
          data={registerData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <RegisterDetailComponent item={item} index={index}  />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default InfoLiving;

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
    marginVertical: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 16,
  },
  wrapper4: { marginHorizontal: 10, marginBottom: 5 },
  box: {
    backgroundColor: COLORS.secondary1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontFamily: "small",
  },
  box3: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontFamily: "small",
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
    color: COLORS.gray,
  },
  title: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
  },
  text2: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.black,
    marginRight: 10,
  },
  text3: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.black,
    marginRight: 5,
  },
});

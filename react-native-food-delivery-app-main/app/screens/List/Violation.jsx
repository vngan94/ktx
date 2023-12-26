import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import ViolationComponent from "../../components/ViolationComponent";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getAllStudentViolationById } from "../../service/allService";

const Violation = ({navigation}) => {
  const [isClick, setisClick] = useState(false);
  const route = useRoute();
  const item = route.params;
  const [data, setdata] = useState(null);
  const [count, setCount] = useState(0);
  const ascending = () => {
    return data.sort((a, b) => Number(a.id) - Number(b.id));
  };
  const descending = () => {
    return data.sort((a, b) => Number(b.id) - Number(a.id));
  };
  const handleOnpress = () => {
    //  !isClick ? setdata(ascending) : setdata(descending);
    setisClick(!isClick);
    if (isClick) {
      ToastAndroid.show("Sắp xếp theo thời gian giảm dần!", ToastAndroid.SHORT);
      setdata(descending);
    } else {
      ToastAndroid.show("Sắp xếp theo thời gian tăng dần!", ToastAndroid.SHORT);
      setdata(ascending)
    }
  };
  useEffect(() => {
    fetchAllStudentViolation();
  },[]);
  let fetchAllStudentViolation = async () => {
    let res = await getAllStudentViolationById({
      id: item.id,
      limit: "",
      offset: 0
    });
    res = res.data;

    if (res && res.errCode === 0) {
      
      setdata(res.data);
      setCount(res.count);
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
          Danh sách vi phạm 
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          marginTop: 20,
          marginHorizontal: 25,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text2}>Tổng số:</Text>
          <Text style={styles.box2}>{count}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginRight: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.text2}>Thời gian</Text>
          <AntDesign
            onPress={handleOnpress}
            name={isClick ? "arrowup" : "arrowdown"}
            size={16}
            style={isClick ? styles.box : styles.box3}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.lightWhite,
          margin: 15,
          borderRadius: 12,
          marginHorizontal: 25,
          marginBottom: 20
        }}
      >
        <FlatList
          data={data}
          scrollEnabled={true}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <ViolationComponent item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Violation;
const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },
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
  text: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
  },
  text2: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.black,
    marginRight: 10,
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
});

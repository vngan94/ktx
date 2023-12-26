import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

import { AntDesign } from "@expo/vector-icons";

import {  useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { getInforLiving } from "../../service/allService";
import moment from "moment";
const InfoLiving = ({ navigation }) => {

  const [data, setData] = useState(null);
  const route = useRoute();
  const item = route.params;


  useEffect(() => {
    fetchInforLiving()
    
  });

 let fetchInforLiving = async () => {
    let res = await getInforLiving(item.id);
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
          Thông tin chỗ ở KTX hiện tại
        </Text>

      

        <View style={styles.wrapper3}>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Khu</Text> 
            <Text style={styles.text}>{ data?.roomData.areaData.areaName}</Text>
          
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Phòng</Text> 
            <Text style={styles.text}>{ data?.roomData.roomName}</Text>
            
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Giường</Text>
            <Text style={styles.text}>{ data?.bedData.value}</Text>
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Loại phòng</Text>
            <Text style={styles.text}>{ data?.roomData.typeroomData.typeRoomName}</Text>
         
          </View>
          <View style={styles.wrapper4}>
            <Text style={styles.title}>Ngày vào ở</Text>
            <Text style={styles.text}>{moment.utc(data?.createdAt).local().format("DD/MM/YYYY")}</Text>
           
          </View>

          
        </View>
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
  wrapper4 :{  marginHorizontal: 10, marginBottom:5 },
  box: {
    // backgroundColor: COLORS.secondary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
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
});

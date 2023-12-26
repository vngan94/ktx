import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS, SIZES } from "../constants/theme";

  import { AntDesign, Feather } from "@expo/vector-icons";
  
  import { useState } from "react";
  import { useEffect } from "react";

  const Navigation = ({ navigation }) => {
  
  
    useEffect(() => {
     
    }, []);
  
    const handleCancel = async() => {
   
        let res = await cancelRegister({id:item.id});
        res = res.data;
        
        if (res && res.errCode === 0) {
          Alert.alert("Hủy đơn đăng ký phòng thành công", [{ defaultIndex: 1 }]);
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
            Xác nhận hủy đơn hàng
          </Text>
          <View />
        </View>
        
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 15,
            borderRadius: 12,
            marginBottom: 230,
          }}
        >
          
        </View>
      </SafeAreaView>
    );
  };
  
  export default Navigation;
  
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
      // backgroundColor: COLORS.secondary1,
      width: 30,
      height: 30,
      borderRadius: 9,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: SIZES.large,
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
    text2: {
      fontSize: SIZES.small,
      fontFamily: "regular",
      color: COLORS.black,
      marginRight: 10,
    },
   
  });
  
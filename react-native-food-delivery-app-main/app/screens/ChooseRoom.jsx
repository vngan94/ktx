import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import Button from "../components/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import CommonUtils from "../util/CommonUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createNewRegister,
  getAllAreaHavingRoomAvailableByGender,
  getAllRoomByTypeRoomAreaAvailable,
} from "../service/allService";
import { array } from "yup";

const ChooseRoom = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params;

  const [areaData, setAreaData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [areaId, setAreaId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [userData, setuserData] = useState(null);
  const focus = useIsFocused();
  const getData = async () => {
    let data = await AsyncStorage.getItem("user");
    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };

  const handleOnPress = async (screen) => {
    if(!roomId) {
      ToastAndroid.show("Hãy chọn đầy đủ thông tin", ToastAndroid.SHORT);
    }
    else {
      let res = await createNewRegister({
        userId: userData && userData.id,
        roomId: parseInt(roomId),
      });
      res = res.data
      if (res && res.errCode === 0) {
        
        navigation.navigate(screen, {id: res.data.id});
      }
    }
    
    
  };

  const handleRoom = async (areaId) => {
    let res = await getAllRoomByTypeRoomAreaAvailable({
      typeRoomId: item.id,
      areaId: parseInt(areaId),
    });

    res = res.data;
    let array = [];
    if (res && res.errCode === 0) {
      if(res.count == 0) {
        ToastAndroid.show("Không có phòng tương ứng hoặc trống với loại phòng và khu vực bạn đã chọn!", ToastAndroid.SHORT);
      }
      else {
        for (var i = 0; i < res.count; i++) {
          array.push({
            value: res.data[i].id.toString(),
            label: res.data[i].roomName,
          });
        }
        
  
        setRoomData(array);
      }
     
    }
  };

  let fetchAllArea = async () => {
    let res = await getAllAreaHavingRoomAvailableByGender(
      // userData && userData.gender
      { typeRoomId: item.id, gender: userData && userData.gender }
    );

    res = res.data;
    let array = [];
    if (res && res.errCode === 0) {
      for (var i = 0; i < res.count; i++) {
        const found = array.some(
          (el) => el.label === res.data[i].areaData.areaName
        );

        if (!found)
          array.push({
            value: res.data[i].areaData.id.toString(),
            label: res.data[i].areaData.areaName,
          });
      }
      setAreaData(array);
    }
  };
  useEffect(() => {
    getData();
    fetchAllArea();
  }, [userData]);

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.offwhite, height: SIZES.height - 380 }}
    >
      <View
        style={{
          marginHorizontal: 25,
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            paddingVertical:5,
            backgroundColor: COLORS.primary,
           
           
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
          Đăng ký phòng
        </Text>
        <View />
      </View>

      {/* Thông tin loại phòng */}
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Thông tin loại phòng</Text>
        <View style={styles.wrapper3}>
          <Text style={styles.regular}>{item.typeRoomName}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.money}>
              {CommonUtils.formatter.format(
                item.priceData.priceService + item.priceData.priceTypeRoom
              )}
            </Text>
          </View>
        </View>
        <View style={{ height: 15 }} />
        <Text style={styles.heading}>Chọn nơi ở</Text>
        {/* Drop down */}
        <View style={styles.wrapper2}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: COLORS.primary },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={areaData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isFocus
                ? `Chọn khu cho ${
                    userData && userData.gender === "F" ? "nữ" : "nam"
                  }`
                : "..."
            }
            searchPlaceholder="Tìm kiếm khu..."
            value={areaId}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setAreaId(item.value);
              handleRoom(item.value);
            }}
          />
          <View style={{ height: 20 }} />

          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: COLORS.primary },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={roomData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Chọn phòng" : "..."}
            searchPlaceholder="Tìm kiếm phòng..."
            value={roomId}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setRoomId(item.value);

              setIsFocus(false);
            }}
          />
        </View>

        <View />

        {/* Button */}
        <View
          style={{
            marginTop: 180,
            backgroundColor: COLORS.primary1,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity style={{ width: "90%", marginLeft: 17 }}>
            <Button
              title={"ĐĂNG KÝ PHÒNG"}
              isValid={true}
              height={false}
              onPress={() => handleOnPress("Success")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseRoom;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 15,
    marginHorizontal: 25,
  },
  wrapper2: {
    marginVertical: 15,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
  },
  wrapper3: {
    marginVertical: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 16,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  money: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.red,
  },
  regular: {
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.black,
  },
  heading: {
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.black,
  },

  small: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray2,
  },
  shortDescription: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.gray,
  },
});

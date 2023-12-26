import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import NetworkImage from "./NetworkImage";
import { COLORS, SIZES } from "../constants/theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonUtils from "../util/CommonUtils";
import { TypeRoomDetailContext } from "../context/TypeRoomDetailContext";

const RegisterComponent = ({ item, price }) => {
  const [userData, setuserData] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {typeRoomId, setTypeRoomId } = useContext(TypeRoomDetailContext);
  useEffect(() => {
    
     
      getData();
    
  },[isFocused]);
  const handleOnPress = () => {
    setTypeRoomId(item.id)
    navigation.navigate("TypeRoomDetail", item);
  };
  const onPress = () => {
    userData === null
      ? navigation.navigate("LoginPage")
      : navigation.navigate("ChooseRoom", item);
  };
  const getData = async () => {
    let data = await AsyncStorage.getItem("user");

    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };
  const link =
    "https://firebasestorage.googleapis.com/v0/b/kktx-435c1.appspot.com/o/e7109487288825.5db325614e622.jpg?alt=media&token=d73ca85e-3f18-4754-8375-aed15d68ad85";
  return (
    <>
      {price ? (
        <TouchableOpacity style={styles.wrapper2} onPress={handleOnPress}>
          <View style={{ height: 10 }} />
          <NetworkImage // Chưa xử lý hình
            data={
              item.imageData.count > 0 ? item.imageData.rows[0].image : link
            }
            // data ={null}
            width={SIZES.width - 50}
            height={SIZES.height / 5.8}
            radius={16}
          />
          <View style={{ height: 10 }} />

          <Text style={styles.heading}>{item.typeRoomName}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.money}>
                {CommonUtils.formatter.format(
                  item.priceData.priceService + item.priceData.priceTypeRoom
                )}
              </Text>
            </View>

            <Text style={styles.box}>
              
              {item.haveRoomAvailable ? "Còn phòng" : "Hết phòng"}
            </Text>
          </View>
          {item.haveRoomAvailable && (
            <Button
              title={"CHỌN PHÒNG"}
              isValid={true}
              height={true}
              onPress={onPress}
            />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.wrapper2} onPress={handleOnPress}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <NetworkImage
              data={
                item.imageData && item.imageData.count > 0
                  ? item.imageData.rows[0].image
                  : link
              }
              width={50}
              height={50}
              radius={9}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.heading}>{item.typeRoomName}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons name="attach-money" size={18} color="red" />
                  <Text style={styles.money}>
                    {CommonUtils.formatter.format(
                      item.priceData.priceService + item.priceData.priceTypeRoom
                    )}
                  </Text>
                </View>
               
              </View>
            </View>
          </View>
       
        </TouchableOpacity>
      )}
    </>
  );
};

export default RegisterComponent;
const styles = StyleSheet.create({
  wrapper: {
    marginTop: -10,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
  },
  money: {
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.red,
  },
  box: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 10,
    height: 30,
    width: 90,
    paddingVertical: 5,
    borderRadius: 9,

    fontSize: SIZES.small,
    fontFamily: "bold",
  },
  wrapper2: {
    marginTop: 5,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
    marginBottom: 10,
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
  time: {
    fontSize: SIZES.small,
    fontFamily: "small",
    color: COLORS.gray,
  },
});

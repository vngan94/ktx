import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { FlatList } from "react-native";

import { AntDesign, MaterialIcon } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";

import { getAllTypeRoomActive } from "../service/allService";
import { TouchableOpacity } from "react-native";
import NetworkImage from "./NetworkImage";
import CommonUtils from "../util/CommonUtils";
import RegisterComponent from "../components/RegisterComponent"
import { TypeRoomDetailContext } from "../context/TypeRoomDetailContext";
const Register = ({ price,itemId }) => {
  const {typeRoomId, setTypeRoomId } = useContext(TypeRoomDetailContext);
  const [count, setCount] = useState(0);
  const [typeRoom, settypeRoom] = useState(null);
  useEffect(() => {
    fetchAllTypeRoomActive();
  }, [typeRoomId]);
  let fetchAllTypeRoomActive = async () => {
    let res = await getAllTypeRoomActive({
      limit: 6,
      offset: 0,
      keyword: "",
    });

    res = res.data;

    if (res && res.errCode === 0) {
      setCount(res.count);
      let temp = res.data.filter((temp) => itemId !== temp.id && temp.haveRoomAvailable);
      
      settypeRoom(temp);
    }
  };
  return (
    <View style={{ marginLeft: 12, marginBottom: 10 }}>
      <FlatList
        horizontal
        data={typeRoom}
        scrollEnabled
        renderItem={({ item }) => (
          <>
           {item.haveRoomAvailable &&  <RegisterComponent item={item} price={false}  />} 
          </>
         
         
         
        )}
      />
    </View>
   
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 10,
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
  wrapper2: {
    marginTop: 5,
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
    marginBottom: 10,
  },
  money: {
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.red,
  },
  heading: {
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.black,
  },
});

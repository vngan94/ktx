import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import ComplaintComponent from "./ComplaintComponent";
import { getAllComplaintById } from "../service/allService";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Complaint = ({ navigation, status, keyword }) => {
  const [userData, setuserData] = useState(null);
  const [complaint, setComplaint] = useState(null);
  const [count, setCount] = useState(null);
  const isFocused = useIsFocused();
  const [dataComplaintRender, setdataComplaintRender] = useState([]);
  useEffect(() => {
    getData();
    fetchAllComplaint();
  }, [isFocused, keyword, userData]);

  const getData = async () => {
    let data = await AsyncStorage.getItem("user");
    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };
  let fetchAllComplaint = async () => {
    let res = await getAllComplaintById({
      keyword: "",
      status: status,
      id: userData?.id,
    });
    res = res.data;

    if (res.data && res.errCode === 0) {
      let users = res.data.filter((obj) =>  obj.complaintHTML?.includes(keyword) || obj.subject.includes(keyword) );
      let v = users?.reverse();
      
      setComplaint(v);
      setdataComplaintRender(v);
     
      setCount(res.count);
    }
  };
  // for (let i = 0; i < dataComplaintRender?.length; i++) {
  //   console.log(i.id);
    
  // }

  return (
    <View
      style={{
        height: SIZES.height - 310,
        backgroundColor: COLORS.lightWhite,
        margin: 15,
        borderRadius: 12,
      }}
    >
      <FlatList
        data={dataComplaintRender}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ComplaintComponent item={item} />}
      />
    </View>
  );
};

export default Complaint;
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
});

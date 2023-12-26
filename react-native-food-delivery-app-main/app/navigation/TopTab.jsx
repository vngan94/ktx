import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import New from "../top/New";
import Accept from "../top/Accept";
import Resolve from "../top/Resolve";
import Deny from "../top/Deny";
import { COLORS, SIZES } from "../constants/theme";

import { SafeAreaView } from "react-native-safe-area-context";

import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import pages from "../screens/page.style";
import All from "../top/All";

const Tab = createMaterialTopTabNavigator();
const TopTab = ({ navigation }) => {

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
 
  useEffect(() => {
    if (focus == true) {
      // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
      getData();
    }
  }, [userData]);


  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          {userData ? (
            <>
              <View style={{ height: "97%" }}>
                <View style={styles.overlay}>
                  <View />
                  <Text style={styles.heading}>Danh sách khiếu nại</Text>
                  <View style={{ flexDirection: "row" }}>
                   
                    <TouchableOpacity
                      style={styles.box2}
                      onPress={() => {
                        navigation.navigate("AddComplaint", userData);
                      }}
                    >
                      <Entypo name="plus" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                 
                  
               
                </View>

                <Tab.Navigator style={{ marginTop: 10 }}>
                  <Tab.Screen name="Tất cả" component={All} />
                  <Tab.Screen name="Chờ xác nhận" component={New} />

                  <Tab.Screen name="Đang giải quyết" component={Accept} />
                  <Tab.Screen name="Thành công" component={Resolve} />
                  <Tab.Screen name="Từ chối giải quyết" component={Deny} />
                </Tab.Navigator>
              </View>
            </>
          ) : (
            // Login
            <View
              style={{
                width: "50%",
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Button
                title={"Đăng  nhập"}
                onPress={() => {
                  navigation.navigate("LoginPage");
                }}
                isValid={true}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopTab;
const styles = StyleSheet.create({
  overlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  box: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    backgroundColor: COLORS.secondary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  text: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
    marginLeft: 20,
  },
});

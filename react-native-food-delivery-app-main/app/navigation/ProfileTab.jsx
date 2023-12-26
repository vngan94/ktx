import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Feather } from "@expo/vector-icons";
import React, { useState, useRef, useEffect, useContext } from "react";
import InfoDetail from "../../app/screens/Detail/InfoDetail";
import RegisterDetail from "../../app/screens/Detail/RegisterDetail";
import Violation from "../../app/screens/List/Violation";
import ContractDetail from "../../app/screens/Detail/ContractDetail";
import LottieView from "lottie-react-native";
import { COLORS, SIZES } from "../constants/theme";
import AssetImage from "../components/AssetImage";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "../components/BackBtn";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import NetworkImage from "../components/NetworkImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import pages from "../screens/page.style";
import { colors } from "../components/cameraStyles";
import Button from "../components/Button";
const Tab = createMaterialTopTabNavigator();
const TopTab = ({ navigation }) => {
  const [userData, setuserData] = useState(null);
  const focus = useIsFocused();
  const animation = useRef(null);
  const keyword = {
    keyword: "Complaint",
  };
  const profile =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";

  const handleLogout = async () => {
    removeData();
    navigation.navigate("LoginPage");
  };
  const isFocused = useIsFocused();
  const removeData = async () => {
    await AsyncStorage.setItem("user", JSON.stringify(null));
    await AsyncStorage.setItem("token", JSON.stringify(null));
  };
  const getData = async () => {
    let data = await AsyncStorage.getItem("user");

    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };
  useEffect(() => {
    getData();
  }, [isFocused]);
 

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <View style={{ height: "97%" }}>
            <View style={{ height: 300 }}>
              <View>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{ width: "100%" }}
                  source={require("../../assets/anime/bg3.json")}
                />
              </View>
            </View>
            {userData && (
              <View style={styles.overlay}>
                <TouchableOpacity style={styles.box2} onPress={handleLogout}>
                  <AntDesign name="logout" size={20} color="white" />
                </TouchableOpacity>
                <View />
              </View>
            )}

            {userData ? (
              <View style={styles.profile}>
                {userData.gender === "M" ? (
                  <Image
                    source={require("../../assets/images/profilenam.jpg")}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require("../../assets/images/profilenu.jpg")}
                    style={styles.image}
                  />
                )}

                <View style={{ height: 10 }} />
                <Text style={styles.text}>
                  {" "}
                  {userData
                    ? userData.fullName + " - " + userData.code
                    : "fullName-code"}{" "}
                </Text>
                <View style={{ height: 5 }} />
                <Text style={styles.email}>
                  {userData ? userData.email : "email"}
                </Text>
              </View>
            ) : (
              <></>
            )}

            {userData ? (
              <InfoDetail userData={userData} />
            ) : (
              <View
                style={{
                  backgroundColor: COLORS.lightWhite,
                  height: 440,
                  borderBottomEndRadius: 30,
                  borderBottomStartRadius: 30,
                }}
              >
                <View
                  style={{ width: "50%", alignSelf: "center", marginTop: 33 }}
                >
                  <Button
                    title={"Đăng nhập"}
                    onPress={() => {
                      navigation.navigate("LoginPage");
                    }}
                    isValid={true}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopTab;
const styles = StyleSheet.create({
  overlay: {
    alignSelf: "flex-end",

    marginVertical: 10,
    right: 15,
    position: "absolute",
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
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: COLORS.secondary1,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.black,
  },
  login: {
    marginTop: 70,
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    fontSize: SIZES.large,
    fontFamily: "large",
    color: COLORS.black,
    alignContent: "center",
  },
  email: {
    fontSize: SIZES.regular,
    fontFamily: "small",
    color: COLORS.black,
  },
  profile: {
    position: "absolute",
    left: 0,
    top: 40,
    right: 0,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 90,
    resizeMode: "cover",
    borderColor: COLORS.primary1,
    borderWidth: 2,
  },
});

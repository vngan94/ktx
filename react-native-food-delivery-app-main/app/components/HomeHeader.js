import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { UserLocationContext } from "../context/UserLocationContext";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { useContext } from "react";
import AssetImage from "./AssetImage";
import { COLORS, SIZES } from "../constants/theme";
import { useState } from "react";
import { useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {
  signInWithPhoneNumber,
  getAuth,
  RecaptchaVerifier,
} from "firebase/auth";

const HomeHeader = () => {
  const [time, setTime] = useState(null);
  const { address, setaddress } = useContext(UserReversedGeoCode);
  const { location, setlocation } = useContext(UserLocationContext);
  const [userData, setuserData] = useState(null);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus == true) {
      // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
      getData();

      getTimeOfDay();
    }
  });

  const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
      setTime("🌝");
    } else if (hour >= 12 && hour < 17) {
      setTime("🌥️");
    } else setTime("🌛");
  };
  const getData = async () => {
    let data = await AsyncStorage.getItem("user");

    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };
  const handlePressTime = async () => {
    const phoneNumber = "+84395442149"; // User's phone number in international format

    var config = {
      apiKey: "AIzaSyBVO3qOKnI34smHTaQkc03iLYqJKAP5kDw",
      authDomain: "kktx-435c1.firebaseapp.com",
      databaseURL: "https://kktx-435c1-default-rtdb.firebaseio.com",
      projectId: "kktx-435c1",
      storageBucket: "kktx-435c1.appspot.com",
      messagingSenderId: "494498841756",
      appId: "1:494498841756:web:7b8a9d3df6842e54c21959",
      measurementId: "G-KW2JG4VWW2",
    };

    const app = initializeApp(config);

    const auth = getAuth(app);

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log("OTP sent to the phone");

        // Save confirmationResult for later use (e.g., when entering OTP)
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <View style={styles.outerStyle}>
        {userData?.gender === "M" ? (
          <AssetImage
            data={require("../../assets/images/profilenam.jpg")}
            width={55}
            height={55}
            mode={"cover"}
            raduis={99}
          />
        ) : (
          <AssetImage
            data={require("../../assets/images/profilenu.jpg")}
            width={55}
            height={55}
            mode={"cover"}
            raduis={99}
          />
        )}

        <View style={styles.headerStyle}>
          <Text style={styles.heading}>Xin chào, </Text>
          <Text style={styles.location}>
            {userData && userData.fullName + " - " + userData.code}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={{ fontSize: 36, marginRight: 10 }}>{time}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  headerStyle: {
    marginLeft: 15,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  location: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});

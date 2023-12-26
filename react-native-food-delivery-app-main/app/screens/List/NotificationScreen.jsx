import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import Search from "../../components/Search";

import LottieView from "lottie-react-native";

import { FlatList } from "react-native";

import NotificationComponent from "../../components/NotificationComponent";

import { getAllNotification } from "../../service/allService";
const NotificationScreen = ({ navigation }) => {
  const animation = useRef(null);
  const [isClickSearchScreen, setisClickSearchScreen] = useState(false);
  const [isSearch, setIsSeach] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [notification, setnotification] = useState(null);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchAllNotification();
  }, [input]);
  let fetchAllNotification = async () => {
    let res = await getAllNotification({
  
      limit: '',
      offset: 0,
      keyword: keyword,
      tagId: "",
    });
    res = res.data;
    if (res && res.errCode === 0) {
      setCount(res.count);
      setnotification(res.data);
    }
  };

  const handleClick = () => {
    setIsSeach(true);
    setisClickSearchScreen(true);
  };
  const handleSearch = () => {
    setInput(keyword);
    setIsSeach(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={22} color={COLORS.white}></AntDesign>
        </TouchableOpacity>

        {/* Tìm kiếm */}
        {!isClickSearchScreen ? (
          <>
            <Text style={styles.text}>Danh sách thông báo</Text>
            <TouchableOpacity style={styles.box} onPress={handleClick}>
              <Feather name="search" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </>
        ) : (
          <Search
            placeholder={"Tìm kiếm theo tên thông báo"}
            onPress={handleSearch}
            keyword={keyword}
            setkeyword={setkeyword}
          />
        )}
      </View>
      {!isSearch ? (
        <ScrollView>
          <View style={{ marginTop:10, marginLeft: 15, marginBottom:50 }}>
            {count > 0 ? (
              <FlatList
                data={notification}
                scrollEnabled
                renderItem={({ item }) => (
                  <NotificationComponent item={item} horizontal={false} />
                )}
              />
            ) : (
              <View
                style={{
                  width: SIZES.width,
                  height: SIZES.height / 1.5,
                  right: 90,
                }}
              >
                <LottieView
                  autoPlay
                  speed={2.5}
                  ref={animation}
                  style={{
                    width: "85%",
                    height: "85%",
                    marginTop: 55,
                    marginLeft: 45,
                  }}
                  source={require("../../../assets/anime/nr.json")}
                />
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            width: SIZES.width,
            height: SIZES.height / 1.5,
            right: 90,
          }}
        >
          <LottieView
            loop={false}
            autoPlay
            ref={animation}
            style={{
              width: "90%",
              height: "90%",
              marginTop: 55,
              marginLeft: 35,
            }}
            source={require("../../../assets/anime/search2.json")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
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
    backgroundColor: COLORS.primary,
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

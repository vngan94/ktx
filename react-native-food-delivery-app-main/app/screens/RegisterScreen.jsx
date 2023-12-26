import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";

import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import pages from "./page.style";
import { useState } from "react";

import RegisterComponent from "../components/RegisterComponent";
import { useEffect } from "react";
import { useRef } from "react";
import { getAllTypeRoomActive } from "../service/allService";
import Search from "../components/Search";
const RegisterScreen = () => {
  const [isClick, setisClick] = useState(false);
  const animation = useRef(null);
  const [isClickSearchScreen, setisClickSearchScreen] = useState(false); // thanh search full màn hình ngnang
  const [isTyping, setIsTyping] = useState(false); //
  const [keyword, setkeyword] = useState("");
  const [typeRoom, settypeRoom] = useState(null);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchAllTypeRoomActive();
  }, [input]);
  let fetchAllTypeRoomActive = async () => {
    let res = await getAllTypeRoomActive({
      //limit: PAGINATION.pagerow,
      limit: '',
      offset: 0,
      keyword: keyword,
    });

    res = res.data;

    if (res && res.errCode === 0) {
      setCount(res.count);
      settypeRoom(res.data);
    }
  };
  const ascending = () => {
    return typeRoom.sort(
      (a, b) =>
        Number(a.priceData.priceService + a.priceData.priceTypeRoom) -
        Number(b.priceData.priceService + b.priceData.priceTypeRoom)
    );
  };
  const descending = () => {
    return typeRoom.sort(
      (a, b) =>
        Number(b.priceData.priceService + b.priceData.priceTypeRoom) -
        Number(a.priceData.priceService + a.priceData.priceTypeRoom)
    );
  };

  const handleOnpress = () => {
    setisClick(!isClick);
    if (isClick) {
      settypeRoom(descending);
      ToastAndroid.show("Sắp xếp theo giá giảm dần!", ToastAndroid.SHORT);
    } else {
      
      settypeRoom(ascending);
      ToastAndroid.show("Sắp xếp theo giá tăng dần!", ToastAndroid.SHORT);
    }
  };
  const handleClick = () => {
    setisClickSearchScreen(true);
  };
  const handleSearch = () => {
    setInput(keyword);
    setIsTyping(true);
  };

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <View style={styles.overlay}>
            {!isClickSearchScreen ? ( // hiển thị thanh tìm kiếm
              <>
                <View />
                <Text style={styles.text}>Danh sách loại phòng</Text>
                <TouchableOpacity style={styles.box} onPress={handleClick}>
                  <Feather name="search" size={22} color={COLORS.white} />
                </TouchableOpacity>
              </>
            ) : (
              <Search
                placeholder={"Tìm kiếm loại phòng"}
                onPress={handleSearch}
                keyword={keyword}
                setkeyword={setkeyword}
              />
            )}
          </View>

          <ScrollView>
            <View style={{ marginLeft: 15, marginTop: 5, marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}
              >
                <View></View>
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text2}>Giá</Text>
                  <TouchableOpacity onPress={{}}>
                    <AntDesign
                      onPress={handleOnpress}
                      name={isClick ? "arrowup" : "arrowdown"} // click true > tăng dần
                      size={16}
                      style={isClick ? styles.boxx : styles.box3}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {count != 0 ? (
                <FlatList
                  data={typeRoom}
                  scrollEnabled
                  renderItem={({ item }) => (
                    <>
                      {isTyping && input !== "" ? (
                        <RegisterComponent item={item} price={true} />
                      ) : (
                        item.haveRoomAvailable && (
                          <RegisterComponent item={item} price={true} />
                        )
                      )}
                    </>
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
                    loop={false}
                    autoPlay
                    speed={2.5}
                    ref={animation}
                    style={{
                      width: "85%",
                      height: "85%",
                      marginTop: 55,
                      marginLeft: 45,
                    }}
                    source={require("../../assets/anime/nr.json")}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  text: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
  },
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
  boxx: {
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
});

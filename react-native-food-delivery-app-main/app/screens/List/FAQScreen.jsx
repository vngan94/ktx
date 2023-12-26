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

import { getAllFAQs } from "../../service/allService";
import FAQTile from "../../components/FAQTile";
const FAQScreen = ({ navigation }) => {
  const animation = useRef(null);
  const [isClickSearchScreen, setisClickSearchScreen] = useState(false);
  const [isSearch, setIsSeach] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [FAQ, setFAQ] = useState(null);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchAllFAQ();
  }, [input]);
  let fetchAllFAQ = async () => {
    let res = await getAllFAQs({
      //limit: PAGINATION.pagerow,
      limit: '',
      offset: '',
      keyword: keyword,
    });

    res = res.data;

    if (res && res.errCode === 0) {
      setCount(res.count);
      setFAQ(res.data);
    }
  };

  const handleClick = () => {
    setIsSeach(true);
    setisClickSearchScreen(true);
    // navigation.navigate('SearchScreen', loader)
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
        {!isClickSearchScreen ? (
          <>
            <Text style={styles.text}>Danh sách FAQ</Text>
            <TouchableOpacity
              style={styles.box}
              //onPress={() => navigation.navigate('Search',{keyword})}
              onPress={handleClick}
            >
              <Feather name="search" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </>
        ) : (
          <Search
            placeholder={"Tìm kiếm câu hỏi và câu trả lời"}
            onPress={handleSearch}
            keyword={keyword}
            setkeyword={setkeyword}
          />
        )}
      </View>
      {!isSearch ? (
        <ScrollView>
          <View style={{ marginBottom: 15, marginTop: 10 }}>
            {/* <Notification horizontal={false}  /> */}
            {count != 0 ? (
              <FlatList
                data={FAQ}
                scrollEnabled={true}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <FAQTile item={item} index={index} />
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

export default FAQScreen;
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

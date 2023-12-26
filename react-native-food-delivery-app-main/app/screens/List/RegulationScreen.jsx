
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

import { getAllRegulations } from "../../service/allService";
import RegulationComponent from "../../components/RegulationComponent";

const RegulationScreen = ({ navigation }) => {
  const animation = useRef(null);
  const [isClickSearchScreen, setisClickSearchScreen] = useState(false);
  const [isSearch, setIsSeach] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [regulation, setregulation] = useState(null);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchAllRegulation();
  }, [input]);
  let fetchAllRegulation = async () => {
    let res = await getAllRegulations({
      //limit: PAGINATION.pagerow,
      limit: 6,
      offset: 0,
      keyword: keyword,
    });

    res = res.data;

    if (res && res.errCode === 0) {
      setCount(res.count);
      setregulation(res.data);
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
        {!isClickSearchScreen ? (
          <>
            <Text style={styles.text}>Danh sách nội quy-quy định</Text>
            <TouchableOpacity
              style={styles.box}
           
              onPress={handleClick}
            >
              <Feather name="search" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </>
        ) : (
          <Search
            placeholder={"Tìm kiếm nội quy-quy định"}
            onPress={handleSearch}
            keyword={keyword}
            setkeyword={setkeyword}
          />
        )}
      </View>
      {!isSearch ? (
        <ScrollView>
          <View style={{ marginBottom: 15, marginTop: 10, marginHorizontal:10 }}>
           
            {count != 0 ? (
             <FlatList
             data={regulation}
             keyExtractor={(item) => item.id}
             renderItem={({ item, index }) => (
               <View style={styles.container}>
                 <RegulationComponent
                   item={item}
                   index={index}
                   horizontal={false}
                 />
               </View>
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

export default RegulationScreen;
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

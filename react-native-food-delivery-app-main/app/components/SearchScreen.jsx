import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";



import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import Search from "../components/Search";
import { COLORS, SIZES } from "../constants/theme";
import { useRoute } from "@react-navigation/native";

const SearchScreen = ({ navigation }) => {
    const route = useRoute();
    const item = route.params;
 ;
    const handleSearch = ()=> {
        
    }
  return (
    <SafeAreaView>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={22} color={COLORS.white}></AntDesign>
        </TouchableOpacity>
        <Search
          placeholder={item.placeholder}
          onPress={handleSearch}
          keyword={keyword}
          setkeyword={setkeyword}
        />
      </View>

      
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    marginRight: 85
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

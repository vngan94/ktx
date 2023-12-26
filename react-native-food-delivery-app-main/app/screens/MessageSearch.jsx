import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";

import { FlatList } from "react-native";
import { Container } from "../styles/MessageStyles";
import pages from "./page.style";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useState } from "react";

import MessageComponent from "../components/MessageComponent";
import Search from "../components/Search";

const Message = ({ navigation }) => {
  const userImg = require("../../assets/users/user-3.jpg");
  const [isSearch, setIsSearch] = useState(false);

  const [keyword, setkeyword] = useState("");
  const [count, setCount] = useState(0);
  const route = useRoute();
  const userData = route.params.userData;
  const p = route.params.people;
  const [people, setpeople] = useState(p);
  const isFocused = useIsFocused();

  useEffect(() => {
    searchPeople();
  }, [isFocused, keyword]);

  const searchPeople = () => {
    const filteredBooks = p.filter(val =>val.fullName.includes(keyword)  || val.code.includes(keyword));
    setpeople(filteredBooks)
    setCount(people.length)
   
  };
  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <>
            <View style={styles.overlay}>
              <View />
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.goBack()}
              >
                <AntDesign
                  name="left"
                  size={22}
                  color={COLORS.white}
                ></AntDesign>
              </TouchableOpacity>

              <Search
                placeholder={"Tìm kiếm theo tên hoặc mã sinh viên/admin"}
                onPress={{}}
                keyword={keyword}
                setkeyword={setkeyword}
              />
            </View>
            <Container>
             
              {count != 0 && (
                <FlatList
                  data={keyword ? people : null}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                  
                    <MessageComponent
                      item={item}
                      isSearch={isSearch}
                      userData={userData}
                    />
                  )}
                />
              )}
            </Container>
          </>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Message;
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
  box2: {
    backgroundColor: COLORS.gray2,
    width: 30,
    height: 20,
    borderRadius: 7,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
  },
  text: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  textNew: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black,
  },
  time: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
  },
});

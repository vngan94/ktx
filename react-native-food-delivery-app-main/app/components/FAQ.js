import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { FlatList } from "react-native";
import { SIZES } from "../constants/theme";
import FAQTile from "./FAQTile";
import Accordion from "react-native-collapsible/Accordion";
import Collapsible from "react-native-collapsible";
import { getAllFAQs } from "../service/allService";

const FAQ = () => {
  // const FAQ = [
  //   {
  //     id: 1,
  //     question: "FAQ Question 1",
  //     answer: "FAQ answer",
  //   },
  //   { id: 2, question: "FAQ Câu hỏi 2", answer: "FAQ Câu trả lời" },
  //   { id: 3, question: "FAQ Câu hỏi 3", answer: "FAQ Câu trả lời" },
  //   { id: 4, question: "FAQ Câu hỏi 4", answer: "FAQ Câu trả lời" },
  //   { id: 5, question: "FAQ Câu hỏi 2", answer: "FAQ Câu trả lời" },
  //   { id: 6, question: "FAQ Câu hỏi 3", answer: "FAQ Câu trả lời" },
  //   { id: 7, question: "FAQ Câu hỏi 4", answer: "FAQ Câu trả lời" },
  //   { id: 8, question: "FAQ Câu hỏi 2", answer: "FAQ Câu trả lời" },
  //   { id: 9, question: "FAQ Câu hỏi 3", answer: "FAQ Câu trả lời" },
  //   { id: 10, question: "FAQ Câu hỏi 4", answer: "FAQ Câu trả lời" },
  // ];

  const [dataFAQ, setdataFAQ] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");

  const [activeSections, setactiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    fetchAllFAQ(keyword);
  }, []);
  let fetchAllFAQ = async (keyword) => {
    let res = await getAllFAQs({
      //limit: PAGINATION.pagerow,
      limit: 3,
      offset: 0,
      keyword: keyword,
    });
    res = res.data;
    if (res && res.errCode === 0) {
      setdataFAQ(res.data);

      //setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dataFAQ}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <FAQTile item={item} index={index} />}
      />
    </View>
  );
};

export default FAQ;
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#F5FCFF",
  //   paddingTop: 30,
  //   marginBottom: 20,
  // },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  activeSelector: {
    color: "red",
  },
});

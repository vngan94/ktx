import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { SIZES } from "../constants/theme";
import RegulationComponent from "./RegulationComponent";
import { getAllRegulations } from "../service/allService";
import { useEffect } from "react";
const Regulation = ({ horizontal }) => {
  const [regulation, setregulation] = useState(null);
  const [keyword, setkeyword] = useState("");
  useEffect(() => {
    fetchAllRegulation(keyword);
  }, []);
  let fetchAllRegulation = async (keyword) => {
    let res = await getAllRegulations({
      //limit: PAGINATION.pagerow,
      limit: 6,
      offset: 0,
      keyword: keyword,
    });
    res = res.data;
    if (res && res.errCode === 0) {
      setregulation(res.data);

      //setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {horizontal ? (
        <FlatList
          data={regulation}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RegulationComponent
              item={item}
              index={index}
              horizontal={horizontal}
            />
          )}
        />
      ) : (
        <FlatList
          data={regulation}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <RegulationComponent
                item={item}
                index={index}
                horizontal={horizontal}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Regulation;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
});

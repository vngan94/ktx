import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import ContractDetailComponent from "../../components/ContractDetailComponent";
import RegisterDetailComponent from "../../components/RegisterDetailComponent";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getAllContract } from "../../service/allService";
const Search = ({ navigation }) => {
  const [isClick, setisClick] = useState(false);
  const route = useRoute();
  const item = route.params;
  const [contractData, setcontractData] = useState(null);
  const [count, setCount] = useState(0);

  const ascending = () => {
    return contractData.sort((a, b) => Number(a.id) - Number(b.id));
  };
  const descending = () => {
    return contractData.sort((a, b) => Number(b.id) - Number(a.id));
  };

  const handleOnpress = () => {
    setisClick(!isClick);
    if (isClick) {
      ToastAndroid.show("Sắp xếp theo thời gian giảm dần!", ToastAndroid.SHORT);
      setcontractData(ascending);
    } else {
      ToastAndroid.show("Sắp xếp theo thời gian tăng dần!", ToastAndroid.SHORT);
      setcontractData(descending);
    }
  };

  useEffect(() => {
    fetchAllContract();
  }, []);
  let fetchAllContract = async () => {
    let res = await getAllContract(item.id);
    res = res.data;

    if (res && res.errCode === 0) {
      setcontractData(res.data);
      setCount(res.count);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 25,
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            backgroundColor: COLORS.primary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontFamily: "small",
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={22} color={COLORS.white}></AntDesign>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: SIZES.xLarge,
            fontFamily: "medium",
            color: COLORS.black,
            marginTop: 20,
          }}
        >
          Danh sách hợp đồng
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 15,
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Tổng số:</Text>
            <Text style={styles.box2}>{count}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginRight: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Thời gian</Text>
            <TouchableOpacity onPress={handleOnpress}>
              <AntDesign
                // onPress={}
                name={isClick ? "arrowup" : "arrowdown"}
                size={16}
                style={isClick ? styles.box : styles.box3}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={contractData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <ContractDetailComponent item={item} index={index} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default Search;

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

  text: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.black,
    marginRight: 10,
  },
  text2: {
    fontSize: SIZES.small,
    fontFamily: "small",
    color: COLORS.black,
    marginRight: 10,
  },
});

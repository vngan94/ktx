import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants/theme";
import AssetImage from "./AssetImage";
import uidata from "../constants/uidata";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
const RegulationComponent = ({ item, index, horizontal }) => {
  const navigation = useNavigation();
  const handleOnPress = (item) => {
    navigation.navigate("RegulationDetail", item);
  };
  const result = uidata.regluationImage.find((item) => item.id === index + 1);
  const image = result ? result.image : uidata.regluationImage[0].image;

  return (
    <TouchableOpacity onPress={() => handleOnPress(item)}>
      <View style={horizontal ? styles.container : styles.container2}>
        <AssetImage
          data={image}
          width={40}
          height={40}
          mode={"cover"}
          raduis={12}
        />
        <Text style={styles.text}>{item.regulationName} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RegulationComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    width: 290,
  },
  container2: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.black,
    textAlign: "center",
    width: "80%",
  },
});

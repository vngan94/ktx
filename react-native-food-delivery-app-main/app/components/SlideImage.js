import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { COLORS } from "../constants/theme";
import { SliderBox } from "react-native-image-slider-box";
const SlideImage = () => {
  const slides = [
    require("../../assets/images/slideimage1.jpg"),
    require("../../assets/images/slideimage2.jpg"),
    require("../../assets/images/slideimage3.jpg"),
  ];

  return (
    <View styles={styles.carouseContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 10 }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default SlideImage;

const styles = StyleSheet.create({
  carouseContainer: {
    flex: 1,
    alignItems: "center",
  },
});

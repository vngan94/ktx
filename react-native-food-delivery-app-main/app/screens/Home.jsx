import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from "./page.style";
import uidata from "../constants/uidata";
import { UserLocationContext } from "../context/UserLocationContext";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";

import HomeHeader from "../components/HomeHeader";


import { ScrollView } from "react-native-virtualized-view";
import SlideImage from "../components/SlideImage";
import Heading from "../components/Heading";
import Notification from "../components/Notification";
import Regulation from "../components/Regulation";
import FAQ from "../components/FAQ";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const handleOnPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Search2 /> */}
            <SlideImage />
            <View style={{marginTop:10}}>
              <Heading
                heading={"Thông báo mới nhất"}
                onPress={() => handleOnPress("Notification")}
              />
              <Notification horizontal={true} />
            </View>

            <View>
              <Heading heading={"FAQs"} onPress={() => handleOnPress("FAQ")} />
              <FAQ />
            </View>
            <View>
              <Heading
                heading={"Nội quy-quy định"}
                onPress={() => handleOnPress("Regulation")}
              />
              <Regulation horizontal={true} />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});

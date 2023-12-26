import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import AppBar from "../../components/AppBar";
import Pdf from "react-native-pdf";
import { ScrollView } from "react-native-virtualized-view";
import { useRoute } from "@react-navigation/native";
import Markdown from "react-native-markdown-display";
const RegualtionDetail = ({ navigation }) => {
  const route = useRoute();
  const item = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        {item.contentMarkdown && (
          <View >
            <Text style={styles.heading}>Văn bản: </Text>
            <Text style={styles.description}>
              <Markdown>{item.contentMarkdown}</Markdown>
            </Text>
          </View>
        )}

        <View>
          <Text style={styles.heading}>Tệp: </Text>
        </View>
      </View>

      <Pdf
        trustAllCerts={false}
        source={{ uri: item.link }}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
      />
    </View>
  );
};

export default RegualtionDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  pdf: {
    flex: 1,

    width: Dimensions.get("window").width - 45,
    height: Dimensions.get("window").height,
    marginTop: 10,
    marginHorizontal: 15,
  },
  text: {
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.black,
  },
  heading: {
    fontSize: SIZES.regular,
    fontFamily: "bold",
    color: COLORS.black,
   
  },
  container2: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

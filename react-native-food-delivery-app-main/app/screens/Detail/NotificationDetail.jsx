import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../../constants/theme";

import NetworkImage from "../../components/NetworkImage";

import { useRoute } from "@react-navigation/native";

import Markdown from "react-native-markdown-display";
import moment from "moment";
import { ScrollView } from "react-native-virtualized-view";

const NotificationDetail = () => {
  const route = useRoute();
  const item = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <NetworkImage
          data={item.image}
          width={"100%"}
          height={220}
          radius={25}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          {item.createdAt === item.updatedAt ? (
            <Text style={styles.time}>
              Ngày đăng:{" "}
              {moment.utc(item.createdAt).local().format("DD/MM/YYYY")}
            </Text>
          ) : (
            <Text style={styles.time}>
              Đã chỉnh sửa:{" "}
              {moment.utc(item.updatedAt).local().format("DD/MM/YYYY")}
            </Text>
          )}
        </View>
        <View  style={{ width: "90%" }}>
        <Text style={styles.heading}>Nội dung</Text>
        <Text style={styles.description}>
          <Markdown>{item.contentMarkdown}</Markdown>
        </Text>
        </View>
        
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.subject}>Chủ đề</Text>
        </View>
        <View style={{ marginVertical: -15 }}>
          <Text style={styles.date2}>{item.tagData.value}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationDetail;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 30
  },
  titleContainer: {
    margin: 15,
    backgroundColor: COLORS.lightWhite,
    height: 100,
    position: "absolute",
    top: 170,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  titleColumn: {
    padding: 15,
  },
  description: {
    // marginTop: 5,
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.black,
  },
  date: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.gray,
    marginLeft: 10,
  },
  date2: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.secondary1,
    alignSelf: "flex-start",
    height: 30,
    borderRadius: 9,

    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.black,
    textAlign: "center",
  },
  shortDescription: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subject: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.black,
  },
  time: {
    fontSize: SIZES.small,
    fontFamily: "small",
    color: COLORS.gray,
  },
});

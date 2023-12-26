import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import NotificationComponent from "./NotificationComponent";
import { useNavigation } from "@react-navigation/native";
import { getAllNotification } from "../service/allService";

const Notification = ({ horizontal }) => {
  const navigation = useNavigation();
  const [notification, setnotification] = useState(null);
  const [keyword, setkeyword] = useState("");
  useEffect(() => {
    fetchAllNotification(keyword);
  }, []);
  let fetchAllNotification = async (keyword) => {
    let res = await getAllNotification({
      //limit: PAGINATION.pagerow,
      limit: 6,
      offset: 0,
      keyword: keyword,
      tagId: "",
    });
    res = res.data;
    if (res && res.errCode === 0) {
      setnotification(res.data);
    }
  };
  return (
    <View style={{ marginLeft: 12 }}>
      {horizontal ? (
        <FlatList
          data={notification}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 5, rowGap: 10 }}
          scrollEnabled
          renderItem={({ item }) => (
            <NotificationComponent item={item} horizontal={horizontal} />
          )}
        />
      ) : (
        <FlatList
          data={notification}
          scrollEnabled
          renderItem={({ item }) => (
            <NotificationComponent item={item} horizontal={horizontal} />
          )}
        />
      )}
    </View>
  );
};

export default Notification;

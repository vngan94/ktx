import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

import NetworkImage from "../../components/NetworkImage";
import { ScrollView } from "react-native-virtualized-view";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Feather, FontAwesome5, Entypo } from "@expo/vector-icons";
import { FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonUtils from "../../util/CommonUtils";
import Register from "../../components/Register";
import { getAllTypeRoomActive } from "../../service/allService";
import Lightbox from "react-native-lightbox-v2";
import CameraModal from "../../components/CameraModal";
import ModalComponent from "../../components/ModalComponent";
const TypeRoomDetail = () => {
  const [userData, setuserData] = useState(null);
  const route = useRoute();
  const item = route.params;
  const [isOpen, setisOpen] = useState(false);
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [typeRoom, settypeRoom] = useState(null);
  const [imgPreview, setimgPreview] = useState("");
  const handleOnPress = (screen) => {
    userData === null
      ? navigation.navigate("LoginPage")
      : navigation.navigate(screen, item);
  };
  let openPreviewImage = (url) => {
    setimgPreview(url);
    setisOpen(true);
  };
  const getData = async () => {
    let data = await AsyncStorage.getItem("user");
    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };
  useEffect(() => {
    if (focus == true) {
      getData();
    }
  },[]);

  return (
    <View>
      <View style={styles.container}>
        <NetworkImage
          data={item.imageData.count > 0 ? item.imageData.rows[0].image : link}
          width={"100%"}
          height={170}
          radius={25}
        />
        <View
          style={{
            marginTop: 140,
            marginHorizontal: 30,
            backgroundColor: COLORS.lightWhite,
            height: 60,
            borderRadius: 9,
            position: "absolute",
            width: SIZES.width - 100,
            flexDirection: "row",
            paddingVertical: 20,
            paddingHorizontal: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="money-check" size={16} color="black" />
            <Text style={styles.money}>
              {CommonUtils.formatter.format(
                item.priceData.priceService + item.priceData.priceTypeRoom
              )}
            </Text>
          </View>
          <Text style={styles.box}>
            {" "}
            {item.haveRoomAvailable ? "Còn phòng" : "Hết phòng"}
          </Text>
        </View>

        <View style={{ marginTop: 40, marginBottom: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subject}>Chi tiết</Text>
          </View>
          <View style={{}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo name="arrow-long-right" size={24} color="black" />
              <Text style={styles.date}>Phí dịch vụ:</Text>
              <Text style={styles.money2}>
                {" "}
                {CommonUtils.formatter.format(item.priceData.priceService)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo name="arrow-long-right" size={24} color="black" />
              <Text style={styles.date}>Tiền phòng:</Text>

              <Text style={styles.money2}>
                {CommonUtils.formatter.format(item.priceData.priceTypeRoom)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subject}>Hình ảnh liên quan</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            {item.imageData.count > 0 && (
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={item.imageData.rows}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => openPreviewImage(item.image)}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image(110, 80, 9)}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.subject2}>Các loại phòng khác</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Feather name="list" size={18} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        <Register price={false} itemId={item.id} />
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary1,
          borderRadius: 20,
          marginHorizontal: 15,
           marginTop: -20,
        }}
      >
        <TouchableOpacity
          style={{
            width: "90%",

            marginLeft: 17,
          }}
        >
          {item.haveRoomAvailable && (
            <Button
              title={"CHỌN PHÒNG"}
              isValid={true}
              height={false}
              onPress={() => handleOnPress("ChooseRoom")}
            />
          )}
        </TouchableOpacity>
      </View>
      {isOpen && (
        <ModalComponent option={"phone"} image={imgPreview} modalVisible={isOpen} setModelVisible={setisOpen}/>
      )}
    </View>
  );
};

export default TypeRoomDetail;
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    height: 200,
  },
  container: {
    margin: 20,
  },
  image: (width, height, radius) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: "cover",
    marginRight: 15,
  }),
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
    fontSize: SIZES.small,
    fontFamily: "small",
    color: COLORS.gray,
  },
  date: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.black,
    marginLeft: 10,
    marginRight: 5,
  },
  date2: {
    padding: 5,
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
    fontSize: SIZES.regular,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subject: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subject2: {
    fontSize: SIZES.regular,
    fontFamily: "bold",
    color: COLORS.black,
  },
  money: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.red,
  },
  money2: {
    marginLeft: 1,
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.black,
  },
  box: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 20,
    height: 30,
    paddingVertical: 5,
    borderRadius: 9,

    fontSize: SIZES.regular,
    fontFamily: "regular",
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
 
});

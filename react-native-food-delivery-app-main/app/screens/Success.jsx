import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { SIZES, COLORS } from "../constants/theme";
import RegisterDetailComponent from "../components/RegisterDetailComponent";
import Button from "../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { getDetailRegisterById } from "../service/allService";
import { useState } from "react";
const Success = () => {
  const animation = useRef(null);
  const navigation = useNavigation();
  const [register, setRegister] = useState(null)
  const route = useRoute();
  const item = route.params;

  const handleOnPress = (screen) => {
    navigation.navigate(screen);
  };

  let getDetailRegister = async()=> {
      let res = await getDetailRegisterById(item.id);
      res = res.data
     
      if (res && res.errCode === 0) {
     
        setRegister(res.data)
    }
  }
    useEffect(()=>{
      getDetailRegister()
    },[])

  return (
    <View>
      <></>
      {register ? (
      <>
      <LottieView
        autoPlay
        ref={animation}
        style={{ width: "100%", height: "78%", marginTop: 30 }}
        source={require("../../assets/anime/success.json")}
      />
      <View style={{ position: "absolute", marginTop: 420, marginLeft: 70 }}>
        <Text style={styles.heading}>Đăng ký phòng thành công</Text>
      </View>
      <View
        style={{
          position: "absolute",
          marginTop: 480,
          marginLeft: 20,
          marginRight: 20,
          width: "90%"
        }}
      >
        <Text style={styles.subject2}>Chi tiết đơn đăng ký phòng</Text>
        <View style={{height:10}}/>
        <RegisterDetailComponent button={"no"} item={register}/>
        <Button title={"Quay về trang chủ"} isValid={true} height={true} onPress={() => handleOnPress("Home")}/>
      </View>
      </>): <Text>Đăng ký phòng thất bại</Text> }
      
     
   
    </View>
  );
};

export default Success;
const styles = StyleSheet.create({
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
    color: COLORS.gray,
    marginLeft: 10,
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
    fontSize: SIZES.large,
    fontFamily: "regular",
    color: COLORS.black,
    textAlign: "center",
  },

  subject: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  subject2: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black,
  },
  money: {
    marginLeft: 1,
    fontFamily: "regular",
    fontSize: SIZES.regular,
    color: COLORS.red,
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

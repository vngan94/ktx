import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
  } from "react-native";
  import React, { useState, useRef, useContext } from "react";
  import Button from "../components/Button";
  import BackBtn from "../components/BackBtn";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
  import { COLORS, SIZES } from "../constants/theme";
  import styles from "./login.style";
  import LottieView from "lottie-react-native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { LoginContext } from "../context/LoginContext";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { handleChangePassword } from "../service/allService";
  import { useRoute } from "@react-navigation/native";
  
  const validationSchema = Yup.object().shape({

    password: Yup.string()
      .min(6, "Mật khẩu của bạn phải có ít nhất 6 ký tự")
      .required("Bắt buộc"),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Mật khẩu mới không khớp"
    ),
  });
  
  const ChangePassword = ({ navigation }) => {
    const route = useRoute();
    const item = route.params;
  
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(false);
    const [obsecureText2, setObsecureText2] = useState(false);
    const [obsecureText3, setObsecureText3] = useState(false);
  
    const inValidForm = () => {
      Alert.alert("Invalid Form", "Please provide all required fields", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
        { defaultIndex: 1 },
      ]);
    };
  
    const changePassword = async (values) => {
    //   let res = await handleResetPassword({
    //     id: item.id,
    //     password: values.password,
    //     oldpassword: values.currentPassword,
    //   });
    //   res =res.data
    //   if (res && res.errCode === 0) {
    //     Alert.alert("Cập nhật mật khẩu mới thành công");
    //     navigation.navigate("InfoDetail")
    //   } else {
    //     Alert.alert(res.errMessage);
    //   }
  
    };
    return (
      <SafeAreaView
        style={{ backgroundColor: COLORS.white, height: SIZES.height }}
      >
        <View
          style={{
            marginHorizontal: 25,
            marginBottom: 40,
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
            Cập nhật mật khẩu
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Formik
            initialValues={{  password: "", rePassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => changePassword(values)}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
             
  
                {/* password */}
                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
  
                    <TextInput
                      secureTextEntry={!obsecureText2}
                      placeholder="Mật khẩu mới"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                      }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
  
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText2(!obsecureText2);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText2 ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
  
                {/* rePassword */}
                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.rePassword ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
  
                    <TextInput
                      secureTextEntry={!obsecureText3}
                      placeholder="Nhập lại mật khẩu mới"
                      onFocus={() => {
                        setFieldTouched("rePassword");
                      }}
                      onBlur={() => {
                        setFieldTouched("rePassword", "");
                      }}
                      value={values.rePassword}
                      onChangeText={handleChange("rePassword")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
  
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText3(!obsecureText3);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText3 ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.rePassword && errors.rePassword && (
                    <Text style={styles.errorMessage}>{errors.rePassword}</Text>
                  )}
                </View>
  
                <Button
                  loader={loader}
                  title={"Lưu"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
               
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ChangePassword;
  
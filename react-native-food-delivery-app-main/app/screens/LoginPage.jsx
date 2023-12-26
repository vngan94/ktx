import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef, useContext } from "react";
import Button from "../components/Button";
import BackBtn from "../components/BackBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import { handleLoginService } from "../service/allService";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Mật khẩu của bạn phải có ít nhất 6 ký tự")
    .required("Bắt buộc"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Bắt buộc")
    .matches("[a-z0-9]+@student.ptithcm.edu.vn", "Sử dụng email sinh viên"),
});

const LoginPage = () => {
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [userData, setuserData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);
  const [isFirst, setFirst] = useState(true);

  const navigation = useNavigation();

  const inValidForm = () => {
    setFirst(false);
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(res.user);
      let x = await AsyncStorage.setItem("userData", jsonValue);

      const jsonValue2 = JSON.stringify(res.accessToken);
      await AsyncStorage.setItem("token", JSON.stringify(jsonValue2));
    } catch (e) {
      // saving error
    }
  };

  const loginFunc = async (values) => {
   
    setLoader(true);
    let res = await handleLoginService({
      email: values.email,
      password: values.password,
    });
    res = res.data;
  
    if (res && res.errCode === 0) {
      AsyncStorage.setItem("user", JSON.stringify(res.user)).then(()=>{})
      AsyncStorage.setItem("token", JSON.stringify(res.accessToken)).then(()=>{})
      navigation.goBack();
    } else {
      let error = res.errMessage;
      Alert.alert("Đăng nhập thật bại", error, [{ defaultIndex: 1 }]);
      setLoader(false);
    }
  };
 
  
  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <BackBtn onPress={() => navigation.goBack()} />
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: 300, marginLeft: 20 }}
          source={require("../../assets/anime/logo.json")}
        />

        <Text style={styles.titleLogin}>iDorm</Text>

        <Formik
          initialValues={{
            email: "n19dccn119@student.ptithcm.edu.vn",
            password: "123456",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => loginFunc(values)}
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
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <TextInput
                    placeholder="Nhập email sinh viên"
                    onFocus={() => {
                      setFieldTouched("email");
                    }}
                    onBlur={() => {
                      setFieldTouched("email", "");
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Mật khẩu</Text>
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
                    secureTextEntry={!obsecureText}
                    placeholder="Nhập mật khẩu ít nhất 6 ký tự"
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
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              <Button
                loader={loader}
                title={"Đ Ă N G N H Ậ P"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isFirst && !isValid ? false : isValid}
              />

              <Text
                style={styles.registration}
                onPress={() => {
                  navigation.navigate("signUp");
                }}
              >
                Quên mật khẩu?
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginPage;

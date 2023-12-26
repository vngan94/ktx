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
import  Button  from "../components/Button";
import  BackBtn  from "../components/BackBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import { verifyForgetPassword } from "../service/allService";




const validationSchema = Yup.object().shape({
  
  // email: Yup.string()
  //   .email("Email không hợp lệ")
  //   .required("Bắt buộc")
  //   .matches("[a-z0-9]+@student.ptithcm.edu.vn", 'Sử dụng email sinh viên')

});

const LoginPage = ({ navigation }) => {
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);
  // const {login, setLogin} = useContext(LoginContext)
  const [isFirst, setFirst] = useState(true)
  
  const inValidForm = () => {
    setFirst(false)
    
  };

  const loginFunc = async (values) => {
    let res = await verifyForgetPassword(values.email)
    
    res = res.data 
    if (res && res.errCode === 0) {
      Alert.alert("Khôi phục mật khẩu thành công", "Chúng tôi đã gửi mật khẩu mới đến email sinh viên của bạn.",[
        
        {
          text: "OK",
          onPress: () => { navigation.navigate("LoginPage")},
        },
       
      ]);
  }
    else {
      Alert.alert("Không tìm thấy tài khoản", res.errMessage, [{ defaultIndex: 1 }]);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        {/* <BackBtn onPress={() => navigation.goBack()} /> */}
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: 300, marginLeft: 20}}
          source={require("../../assets/anime/logo.json")}
        />

        <Text style={styles.titleLogin}>iDorm</Text>
        
        <Formik
          initialValues={{ email: "n19dccn119@student.ptithcm.edu.vn" }}
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

              

              <Button
                loader={loader}
                title={"G Ử I"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid }
             
              />

             
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginPage;

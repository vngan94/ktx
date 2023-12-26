import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef } from "react";
import Button from "../components/Button";

import { Formik } from "formik";
import * as Yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

import { createNewComplaint } from "../service/allService";
import { useNavigation, useRoute } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  subject:
    Yup.string()
    .required("Bắt buộc"),
  complaintHTML:
    Yup.string()
    .required("Bắt buộc"),
});

const AddComplaint = () => {
  const [loader, setLoader] = useState(false);
  const [isFirst, setFirst] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params;
  const inValidForm = () => {
    setFirst(false);
  };

  const loginFunc = async (values) => {
    setLoader(true);
    let res = await createNewComplaint({
      userId: item.id,
      subject: values.subject,

      complaintHTML: values.complaintHTML,
    });

    res = res.data;

    if (res && res.errCode === 0) {
      Alert.alert("Tạo mới khiếu nại thành công");
      // navigation.goBack();
      setLoader(false);
    } else {
      let error = res.errMessage;
      Alert.alert("Tạo mới khiếu nại thất bại", error, [{ defaultIndex: 1 }]);
      setLoader(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.offwhite }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <View
          style={{
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
            Tạo mới khiếu nại
          </Text>
        </View>

        <Formik
          initialValues={{
            subject: "",
            complaintHTML: "",
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
                <Text style={styles.label}>Chủ đề</Text>
                <View
                  style={styles.inputWrapper(
                    touched.subject ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <TextInput
                    placeholder=""
                    onFocus={() => {
                      setFieldTouched("subject");
                    }}
                    onBlur={() => {
                      setFieldTouched("subject", "");
                    }}
                    value={values.subject}
                    onChangeText={handleChange("subject")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      flex: 1,
                      paddingTop: 10,
                      fontFamily: "regular",
                      fontSize: SIZES.regluar,
                    }}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                  />
                </View>
                {touched.subject && errors.subject && (
                  <Text style={styles.errorMessage}>{errors.subject}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Nội dung</Text>
                <View
                  style={styles.inputWrapper2(
                    touched.complaintHTML ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <TextInput
                    placeholder=""
                    onFocus={() => {
                      setFieldTouched("complaintHTML");
                    }}
                    onBlur={() => {
                      setFieldTouched("complaintHTML", "");
                    }}
                    value={values.complaintHTML}
                    onChangeText={handleChange("complaintHTML")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      flex: 1,
                      paddingTop: 10,
                      fontFamily: "regular",
                      fontSize: SIZES.regluar,
                    }}
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical="top"
                  />
                </View>
                {touched.complaintHTML && errors.complaintHTML && (
                  <Text style={styles.errorMessage}>
                    {errors.complaintHTML}
                  </Text>
                )}
              </View>

              <Button
                loader={loader}
                title={"Gửi"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isFirst && !isValid ? false : isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default AddComplaint;
const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width,
    marginBottom: SIZES.xxLarge,
  },

  titleLogin: {
    marginVertical: 20,
    marginHorizontal: 60,
    fontFamily: "bold",
    fontSize: 35,
    color: COLORS.primary,
    textAlign: "center",
  },

  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "left",
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 100,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  inputWrapper2: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 250,
    borderRadius: 12,

    paddingHorizontal: 15,
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registration: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    marginTop: 20,
    textAlign: "center",
  },
});

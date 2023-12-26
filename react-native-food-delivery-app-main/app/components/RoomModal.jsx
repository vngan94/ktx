import React, { useState } from "react";

import moment from "moment";

import {
  TextInput,
  Text,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { ModalContainer } from "./cameraStyles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

import * as Yup from "yup";

const RoomModal = ({ modalVisible, setModelVisible }) => {
  const [loader, setLoader] = useState(false);

  const [countryData, setCountryData] = useState([]);

  const [country, setCountry] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const handleCloseModal = () => {
    setModelVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.8)",
          height: SIZES.height,
        }}
      >
        <View
          style={{
            borderRadius: 10,
            marginTop: 100,
            padding: 30,
          }}
        >
          <View style={{ alignItems: "flex-end", marginBottom: 5 }}></View>
          <View
            style={{
              backgroundColor: COLORS.lightWhite,
              borderRadius: 10,
              padding: 10,
              height: 220,
            }}
          >
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity style={styles.box} onPress={handleCloseModal}>
                <AntDesign
                  name="close"
                  size={22}
                  color={COLORS.white}
                ></AntDesign>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={styles.subject}>Chọn khu vực</Text>
              </View>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && { borderColor: COLORS.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countryData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocus ? (
                    <Text style={styles.description}>
                      Chọn khu vực bạn muốn ở{" "}
                    </Text>
                  ) : (
                    "..."
                  )
                }
                searchPlaceholder="Tìm kiếm khu vực..."
                value={country}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCountry(item.value);
                  handleState(item.value);
                  setCountryName(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={{}}>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={styles.heading}>Chọn phòng </Text>
              </View>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && { borderColor: COLORS.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countryData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocus ? (
                    <Text style={styles.description}>
                      Chọn phòng bạn muốn ở{" "}
                    </Text>
                  ) : (
                    "..."
                  )
                }
                searchPlaceholder="Tìm kiếm khu vực..."
                value={country}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCountry(item.value);
                  handleState(item.value);
                  setCountryName(item.label);
                  setIsFocus(false);
                }}
              />
            </View>

            <Button
              loader={loader}
              title={"Xong"}
              isValid={true}
              onPress={handleCloseModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RoomModal;
const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 30,
    position: "absolute",
  },
  box: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    backgroundColor: COLORS.gray2,
    width: 80,
    height: 80,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: SIZES.regular,
    fontFamily: "regular",
    color: COLORS.black,
  },
  email: {
    fontSize: SIZES.large,
    fontFamily: "regular",
    color: COLORS.black,
  },
  profile: {
    position: "absolute",
    left: 0,
    top: 40,
    right: 0,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 90,
    resizeMode: "cover",
    borderColor: COLORS.primary1,
    borderWidth: 2,
  },
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
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
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
    marginTop: 20,
    textAlign: "center",
  },
});

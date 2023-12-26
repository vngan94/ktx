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
  Image,
} from "react-native";
import { ModalContainer } from "./cameraStyles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

const ModalComponent = ({ modalVisible, setModelVisible, option, image }) => {
  const handleCloseModal = () => {
    setModelVisible(false);
  };

  return (
    <>
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
          <ModalContainer>
            <View
              style={{
                borderRadius: 10,

                height: "100%",
                alignItems: "center",
              }}
            >
              
              <View style={styles.centered}>
                <View style={{ justifyContent: "flex-end", marginBottom: 10 }}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={handleCloseModal}
                  >
                    <AntDesign
                      name="close"
                      size={22}
                      color={COLORS.white}
                    ></AntDesign>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: SIZES.width,
                    height: "50%",

                    resizeMode: "cover",
                  }}
                />
              </View>
            </View>
          </ModalContainer>
        </View>
      </Modal>
    </>
  );
};

export default ModalComponent;
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

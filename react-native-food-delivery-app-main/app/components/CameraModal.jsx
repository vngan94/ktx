import React, { useState } from "react";
import {
  Text,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { ModalContainer } from "./cameraStyles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Image } from "react-native";

const CameralModal = ({
  modalVisible,
  setModelVisible,
  input,
  setinput,
  handleAdd,
  todos,
  isEdit,
  setisEdit,
  handleEdit,
  todoEdit,
  image
}) => {

  const handleCloseModal = () => {
    setModelVisible(false);
  };
  const handleOpenModal = () => {
    setModelVisible(true);
  };
  const handleSubmit = () => {
    // if (isEdit) {
    //     handleEdit({
    //         title: input,
    //         date: todoEdit.date,
    //         key: todoEdit.key
    //     })
    // }
    // else {
    //     handleAdd({
    //         title: input,
    //         key: todos.length + 1 + '_' + input,
    //         date: new Date().toDateString()
    //     })
    // }
    // setinput('')
    setModelVisible(false);
  };
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();

  let options = {
    saveToPhotos: true,
    mediaType: "photo",
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    console.log(granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("check openCamera");
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
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
          <View style={{marginTop: "50%"}}>
            <Image
              source={{ uri: image }}
              style={{width: "100%",
                height: "50%",
                borderRadius: 10,
                resizeMode: "cover",
                marginRight: 15}}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CameralModal;
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
});

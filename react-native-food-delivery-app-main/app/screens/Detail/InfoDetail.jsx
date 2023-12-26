import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import InfoComponent from "../../components/InfoComponent";
import { useState } from "react";
import CameralModal from "../../components/CameraModal";
import ModalComponent from "../../components/ModalComponent";
import { useNavigation } from "@react-navigation/native";

const InfoDetail = ({ userData }) => {

  const [modalVisible, setModelVisible] = useState(false);
  const [modalVisible2, setModelVisible2] = useState(false);
  const [isClick, setisClick] = useState(false);
  const [option, setOption] = useState("");


  const navigation = useNavigation();
  const handleOnPress = (screen) => {
    navigation.navigate(screen, userData);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.lightWhite,
        margin: 15,
        marginTop: 10,
        borderRadius: 12,
      }}
    >
      {/* Thông tin chỗ ở KTX hiện tại */}
      <TouchableOpacity onPress={() => handleOnPress("InfoLiving")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Thông tin chỗ ở KTX hiện tại</Text>
            {/* <Text style={styles.text}>Giường B2, phòng 2A12, Khu A,</Text>
            <Text style={styles.text}>Phòng dịch vụ 4 sinh viên</Text> */}
          </View>
          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity>
      {/* Danh sách vi phạm*/}
      <TouchableOpacity onPress={()=> handleOnPress('Violation')}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Vi phạm</Text>
          </View>

          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity>

      {/* Danh sách đơn dăng ký phòng*/}
      <TouchableOpacity onPress={() => handleOnPress("RegisterDetail")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Danh sách đơn đăng ký phòng</Text>
          </View>

          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity>

      {/* Danh sách hợp đồng*/}
      <TouchableOpacity onPress={() => handleOnPress("ContractDetail")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Hợp đồng</Text>
          </View>

          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity>

     

      {/* Thay đổi mật khẩu */}

      <TouchableOpacity onPress={() => handleOnPress("ChangePassword")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Thay đổi mật khẩu</Text>
          </View>
          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity>
      {/* Thay đổi avatar */}

      {/* <TouchableOpacity onPress={handelOpenCameraModel}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Thay đổi avatar</Text>
          </View>
          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity> */}
      {/* Cập nhật giấy tờ tùy thân */}

      {/* <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Cập nhật giấy tờ tùy thân</Text>
          </View>
          <AntDesign name="right" size={18} color={COLORS.gray} />
        </View>
      </TouchableOpacity> */}

      {/* Modal */}
      {/* <CameralModal
        modalVisible={modalVisible}
        setModelVisible={setModelVisible}
      />

      <ModalComponent
        modalVisible={modalVisible2}
        setModelVisible={setModelVisible2}
        option={option}
      /> */}
       
    </View>
  );
};

export default InfoDetail;
const styles = StyleSheet.create({
  inner: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    backgroundColor: COLORS.lightWhite,
    margin: 15,
    borderRadius: 12,
  },
  title: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
  },
  text: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.gray,
  },
});

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
// import fetchProfile from "../hooks/fetchProfile";
import { LoginContext } from "../context/LoginContext";

import { AntDesign } from "@expo/vector-icons";

import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import RegistrationTile from "../components/RegistrationTile";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  // const { user, isProfileLoading, error, refetch } = fetchProfile();
  const profile =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";
  const bkImg =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";
  // if (isProfileLoading) {
  //   return <LoadingScreen />;
  // }
  return (
    <View>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 80,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <Image
            source={{ uri: bkImg }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: 0.7,
              },
            ]}
          />
          <View style={styles.profile}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <NetworkImage
                data={user === null ? profile : user.profile}
                width={45}
                height={45}
                radius={99}
              />
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <Text style={styles.text}>
                  {user === null ? "username" : user.username}
                </Text>
                <Text style={styles.email}>
                  {user === null ? "email" : user.email}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <AntDesign name="logout" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <RegistrationTile
            heading={"Quản lý thông tin"}
            // desc={
            //   "Đảm bảo cập nhật đầy đủ thông tin 1 cách nhanh nhất"
            // }
          />

          <View
            style={{
              height: 90,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
          
              <ProfileTile title={"Thông tin cá nhân"} icon={"infocirlceo"}  onPress={() => navigation.navigate("InfoDetail")} />
              <ProfileTile
                title={"Đổi mật khẩu"}
                icon={"form-textbox-password"}
                font={2}
              />
          
          </View>

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile
              title={"Danh sách vi phạm"}
              icon={"clipboard-list-outline"}
              font={2}
            />
            <ProfileTile
              title={"Đơn đăng ký phòng"}
              icon={"ios-file-tray"}
              font={1}
            />
            <ProfileTile title={"Hợp đồng"} icon={"signature"} font={3} />
          </View>

          <RegistrationTile heading={"Thông tin khác và hỗ trợ"} />
          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Giới thiệu"} icon={"presentation"} font={2} />
            <ProfileTile title={"Ngôn ngữ"} icon={"language"} font={1} />
            <ProfileTile
              title={"Chính sách bảo mật"}
              icon={"security"}
              font={2}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: "medium",
    color: COLORS.black,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 60,
  },
});

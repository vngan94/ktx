import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  searchContainer: {
    width: SIZES.width - 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.small,
    height: 35,
  },
  input: {
    fontFamily: "small",

    height: "100%",
    paddingHorizontal: 10,
  },
  searchImage: {
    resizeMode: "contain",

    height: SIZES.height / 2.2,
    paddingHorizontal: 20,
  },
  searchWrapper: {
    // marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBlue,
  },
  tile: {
    marginHorizontal: 12,
    marginBottom: 10,
  },
  box: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
});

export default styles;

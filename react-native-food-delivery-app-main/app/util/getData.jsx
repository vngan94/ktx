import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
    let data = await AsyncStorage.getItem("user");

    if (data !== null) {
   
      return JSON.parse(data);
    } else {
      return null;
    }
  };
  export default getData
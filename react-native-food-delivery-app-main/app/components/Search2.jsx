import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import { Feather, AntDesign } from "@expo/vector-icons";
import styles from "../screens/search.style";
import LottieView from "lottie-react-native";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const animation = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://travelapprailway-production.up.railway.app/api/places/search/${searchKey}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  return (
   
      <View style={{ backgroundColor: COLORS.primary}}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
          }}
        >
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.input}
                value={searchKey}
                onChangeText={setSearchKey}
                placeholder="What are you looking for?"
              />
            </View>

            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Feather name="search" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          
        </View>
      </View>
   
  );
   
};

export default Search;

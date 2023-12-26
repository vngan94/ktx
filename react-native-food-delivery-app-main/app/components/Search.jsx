import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { COLORS } from "../constants/theme";
import { Feather } from "@expo/vector-icons";
import styles from "../screens/search.style";

const Search = ({ placeholder, onPress, keyword, setkeyword }) => {


  return (
    <View>
      <View style={styles.searchContainer}>
        <View>
          <TextInput
            style={styles.input}
            value={keyword}
            onChangeText={setkeyword}
            placeholder={

              placeholder
            }
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={onPress}>
          <Feather name="search" size={22} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
    
    </View>
  );
};

export default Search;

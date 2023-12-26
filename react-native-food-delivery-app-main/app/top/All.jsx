import {  View } from "react-native";
import React from "react";
import Complaint from "../components/Complaint";
import Search from "../components/Search";
import { useState } from "react";


const All = () => {
  const [keyword, setkeyword] = useState("");
  const [input, setInput] = useState("");
  const handleSearch = () => {
    
    setInput(keyword);
  };

  return (
    <View>
      <View style={{ width: "100%", marginTop: 15, marginLeft: 5, }}>
        <Search
          placeholder={"Tìm kiếm theo chủ đề, nội dung"}
          onPress={handleSearch}
          keyword={keyword}
          setkeyword={setkeyword}
        />
      </View >
      <></>
    
      <Complaint status={""} keyword={input}/>
    </View>
  );
};

export default All;

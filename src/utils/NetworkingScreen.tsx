import React from "react";
import NetworkLogger from "react-native-network-logger";
import { View } from "react-native";

import Header from "../Components/Header";
import { Color } from "./color";

function NetWorkingScreen() {
  return (
    <View style={{ flex: 1, marginTop: "20%" }}>
      <View style={{ flex: 1 }}>
        <NetworkLogger />
      </View>
    </View>
  );
}

export default NetWorkingScreen;

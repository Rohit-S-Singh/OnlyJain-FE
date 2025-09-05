/* istanbul ignore file */
import { Alert } from "react-native";
import { Strings } from "./strings";

export const showAlert = (message, onClick = undefined) => {
  Alert.alert(
    Strings.appName,
    message,
    [{ text: "OK", onPress: () => onClick !== undefined && onClick() }],
    {
      cancelable: false,
    }
  );
};

export const showActionAlert = (message, action) => {
  Alert.alert(Strings.appName, message, [{ text: "OK", onPress: action }], {
    cancelable: false,
  });
};

export const showOptionAlert = (message, action) => {
  Alert.alert(
    Strings.appName,
    message,
    [{ text: "OK", onPress: action }, { text: "Cancel" }],
    { cancelable: false }
  );
};

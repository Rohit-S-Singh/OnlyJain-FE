/* istanbul ignore file */
import { Alert } from "react-native";

type AlertProps = {
  message: string;
  action?: () => void;
  cancelable?: boolean;
  showCancel?: boolean; // New prop to control the visibility of the Cancel button
};

const CustomAlert = ({
  message,
  action,
  cancelable = false,
  showCancel = true, // Default value for showCancel is true
}: AlertProps) => {
  const buttons: any = [
    ...(showCancel ? [{ text: "Cancel", style: "cancel" }] : []), // Add Cancel button only if showCancel is true
    { text: "OK", onPress: action },
  ];

  Alert.alert("", `${message}`, buttons, { cancelable });
};

export default CustomAlert;

/* istanbul ignore file */
import { PixelRatio, Platform } from "react-native";

//MARK: - Font Family Name Define
export const Font = {
  // BauhausBold: "BauhausBold",
  // BauhausBoldItalic: "BauhausBoldItalic",
  // BauhausItalic: "BauhausItalic",
  // BauhausRegular: "BauhausRegular",
  BauhausBold: Platform.OS === "ios" ? "Bauhaus-Bold" : "BauhausBold",
  BauhausBoldItalic:
    Platform.OS === "ios" ? "Bauhaus-BoldItalic" : "BauhausBoldItalic",
  BauhausItalic: Platform.OS === "ios" ? "Bauhaus-Italic" : "BauhausItalic",
  BauhausRegular: Platform.OS === "ios" ? "Bauhaus-Regular" : "BauhausRegular",
  PoppinsThin: "Poppins-Thin",
  PoppinsExtraLight: "Poppins-ExtraLight",
  PoppinsLight: "Poppins-Light",
  PoppinsRegular: "Poppins-Regular",
  PoppinsMedium: "Poppins-Medium",
  PoppinsSemiBold: "Poppins-SemiBold",
  PoppinsBold: "Poppins-Bold",
  PoppinsExtraBold: "Poppins-ExtraBold",
  PoppinsBlack: "Poppins-Black",
};

//MARK:- Font Size for Font Scaling Define
const fontScale = PixelRatio.getFontScale();
export const getFontSize = (size: number) => size / fontScale;

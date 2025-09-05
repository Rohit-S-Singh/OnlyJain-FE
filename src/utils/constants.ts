import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseHeight = 812; // based on iPhone 11
const scale = width / 375; // base scale based on iPhone 11 width

export const AppConstants = {
  isBack: "shouldShowBack",
  isScreen: "Search",
  RECENT_SEARCH_KEY: "RECENT_SEARCHES",
  NETWORK_CHECK: false,
};

export const ApiConstants = {
  APP_VERSION: "1.0.0",
  DEVICE_TYPE: Platform.OS,
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  POST_WITH_FORM: "POST_WITH_FORM",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const MetrixConstant = {
  SCREEN_WIDTH: Dimensions.get("screen").width,
  SCREEN_HEIGHT: Dimensions.get("screen").height,
};

export function normalize(size: any) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const isSmallDevice = height < 700; // iPhone SE or similar

/* istanbul ignore next */
export const isTablet = width > 768 && height > 1024;

export const MINI_APP_TOKEN_KEY = "MINI_APP_TOKEN";
export const USER_ROLE = "USER_ROLE";

export const DateFormats = {
  DATE: "DD/MM/YYYY",
  TIME: "HH:mm",
  DATE_TIME: "DD/MM/YYYY HH:mm",
  DATE_TIME_WITH_SECONDS: "DD/MM/YYYY HH:mm:ss",
  TIME_WITH_SECONDS: "HH:mm:ss",
  MONTH_YEAR: "MM/YYYY",
  MONTH_DATE_YEAR: "MMM DD, YYYY",
};

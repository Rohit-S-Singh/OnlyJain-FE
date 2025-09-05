import moment from "moment";
import React from "react";
import {
  Image,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CryptoJS from "react-native-crypto-js";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { tokenSet } from "../api/CommonApi";
import store from "../store/store";
import { Color } from "./color";
import { isTablet, normalize } from "./constants";
import { Font, getFontSize } from "./fonts";
import { Images } from "./images";

const key = "s0m3r4nd0ms4ltv4lu3";
const base62Chars =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Generate day numbers with format MM-DD-YYYY
export const generateDayNumbers = (date?: any) => {
  const today = date ? moment(date) : moment();
  const currentMonth = today.month();
  const currentYear = today.year();
  const daysInMonth = today.daysInMonth();
  const currentDay = today.date();

  const dates = [];

  // Add remaining days of the current month
  for (let day = currentDay; day <= daysInMonth; day++) {
    const date = moment({ year: currentYear, month: currentMonth, day });

    const displayKey = date.format("DD-MM-YYYY");
    const label = day.toString();

    dates.push({ label, key: displayKey });
  }

  // Add days from the next month
  const nextMonth = today.clone().add(1, "month");
  const nextMonthDays = nextMonth.daysInMonth();

  for (let day = 1; day <= nextMonthDays; day++) {
    const date = moment({
      year: nextMonth.year(),
      month: nextMonth.month(),
      day,
    });

    const displayKey = date.format("DD-MM-YYYY");
    const label = day.toString();

    dates.push({ label, key: displayKey });
  }

  return dates;
};

//MARK:- Calculate the duration between two dates
export const calculateDuration = (start: any, end: any) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const duration = new Date(endTime - startTime);
  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  return `${hours}h ${minutes}m`;
};

//MARK:- Remove Commas from name
export const getNameWithoutCommas = (crewName: string) => {
  if (!crewName) return crewName;
  const nameParts = crewName?.split(",").map((part) => part.trim());
  if (nameParts.length === 2) {
    return `${nameParts[1]} ${nameParts[0]}`;
  } else {
    return crewName;
  }
};

//MARK:- Flight with dots view
export const FlightWithDotsView = ({ customStyle }: any) => (
  <View style={[styles.flightWithDots, customStyle]}>
    <Image
      source={getImage(Images.ic_dot_indicator)}
      style={styles.dotIndicator}
    />
    <Text style={{ letterSpacing: 2 }}>
      {Platform.OS == "android" ? `---------` : `------`}
    </Text>
    <Image source={getImage(Images.ic_plane)} style={styles.planeStyle} />
    <Text style={{ letterSpacing: 2 }}>
      {Platform.OS == "android" ? `---------` : `------`}
    </Text>
    <Image
      source={getImage(Images.ic_dot_indicator)}
      style={styles.dotIndicator}
    />
  </View>
);

const styles = StyleSheet.create({
  planeStyle: { height: 28, width: 28 },
  flightWithDots: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    position: "absolute",
    left: isTablet ? widthPercentageToDP(30) : widthPercentageToDP(20),
    top: isTablet ? normalize(2) : normalize(2),
  },
  dotIndicator: {
    height: 12,
    width: 12,
  },
});

//MARK:- Encrypt IGA
function padKey(key: any) {
  // Pad or trim key to 32 bytes (256 bits)

  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);

  let keyWords = keyUtf8.words;

  let keySigBytes = keyUtf8.sigBytes;

  if (keySigBytes > 32) {
    keyWords = keyWords.slice(0, 8); // 8 words * 4 bytes = 32 bytes

    keySigBytes = 32;
  } else if (keySigBytes < 32) {
    // Pad with zeros

    let paddedWords = keyWords.slice();

    while (paddedWords.length < 8) paddedWords.push(0);

    keyWords = paddedWords;

    keySigBytes = 32;
  }

  return CryptoJS.lib.WordArray.create(keyWords, keySigBytes);
}
/* istanbul ignore next */
export function encryptIGA(plainText: any) {
  if (!plainText || !key) throw new Error("plainText and key are required.");

  // Pad key to 32 bytes

  const keyWordArray = padKey(key);

  // Generate random 16-byte IV

  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt
  const encrypted = CryptoJS.AES.encrypt(plainText, keyWordArray, {
    iv: iv,

    mode: CryptoJS.mode.CBC,

    padding: CryptoJS.pad.Pkcs7,
  });

  // Combine IV and ciphertext

  const ivHex = iv.toString(CryptoJS.enc.Hex);

  const cipherBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

  const ivBytes = CryptoJS.enc.Hex.parse(ivHex);

  const cipherBytes = CryptoJS.enc.Base64.parse(cipherBase64);

  const combined = ivBytes.concat(cipherBytes);

  // Convert to Base64

  const base64 = CryptoJS.enc.Base64.stringify(combined);

  // URL-encode
  const aa = encodeURIComponent(base64);

  return aa;
}

export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert to base64 standard
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c: any) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT Token:", e);
    return null;
  }
};
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: Color.textOrange }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: getFontSize(13),
        fontWeight: "400",
        fontFamily: Font.PoppinsRegular,
      }}
      text2Style={{
        fontSize: getFontSize(12),
        fontWeight: "400",
        fontFamily: Font.PoppinsRegular,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: normalize(13),
      }}
      text2Style={{
        fontSize: normalize(12),
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }: any) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "white",
        marginTop: 20,
      }}
    >
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  customToast: ({ text1, text2, type }: any) => (
    <View
      style={{
        height: 60,
        width: "90%",
        backgroundColor: text1 === "success" ? Color.green : Color.red,
        borderRadius: 8,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontSize: normalize(14),
          fontWeight: "bold",
          color: Color.white,
          marginBottom: 5,
          fontFamily: Font.PoppinsRegular,
        }}
      >
        {text1}
      </Text>
      {text2 && (
        <Text
          style={{
            fontSize: normalize(12),
            color: Color.white,
            fontFamily: Font.PoppinsRegular,
          }}
        >
          {text2}
        </Text>
      )}
    </View>
  ),
};

const months = [
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan 2025",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
];

export const getInitialMonth = (): string => {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "short" });
  const year = now.getFullYear();
  const formatted = month === "Jan" ? `${month} ${year}` : month;
  return months.includes(formatted) ? formatted : months[0];
};

export const getNameInitials = (name = "") => {
  return name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";
};

export const scrollToBottom = (scrollRef: any) => {
  // Scroll to the bottom when an ExpandableSection is clicked
  InteractionManager.runAfterInteractions(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  });
};

export const setHeaders = async (dummyToken: any, iga: any) => {
  const encryptedIga = encryptIGA(iga); // Encrypt the IGA value
  await tokenSet(dummyToken, encryptedIga); // Set the token and encrypted IGA in headers
};

// export function getImage(img: string) {
//   return { uri: img };
// }

export function getImage(img: any) {
  return img;
}

export const getTimeAgo = (timeString: string) => {
  const past = new Date(timeString).getTime();
  const now = Date.now();
  const diffMs = now - past;

  if (diffMs < 0) return `0 min ago`; // future-proof
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMin < 1) return `0 min ago`;
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
};

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const optionsDate = { month: "short", day: "numeric" }; // Jan 18
  const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true }; // 11:30 AM
  return `${date.toLocaleDateString("en-US", optionsDate)}, ${date
    .toLocaleTimeString("en-US", optionsTime)
    .toLowerCase()}`;
}

// Usage
const formattedTime = formatDateTime("2025-08-05T14:00:00");

// @ts-ignore: Prevent JSX parsing
export const safeGet = <T,>(fn: () => T, fallback: T): T => {
  try {
    const value = fn();
    return value !== undefined && value !== null ? value : fallback;
  } catch {
    return fallback;
  }
};
export const isTimeZoneUTC = () => {
  const state = store.getState();
  const loginUserDetail = state.user?.loginUserDetail;

  // Safely check isUTC, fallback to false if not set
  return !!loginUserDetail?.isUTC;
  // const timeFormat = state.timeFormat.value; // Get from global state
  // const isUTC = timeFormat === "utc";
  // return isUTC;
};

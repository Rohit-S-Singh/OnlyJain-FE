/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { showErrorDialog } from "../utils/ErrorDialog";
import { ApiConstants } from "../utils/constants";
// import { getToken } from "./tokenService"; // Assuming a simple token service
import { BASE_URL } from "./EndPoints";
import CustomAlert from "../utils/CustomAlert";

interface CommonApiParams {
  method?: string;
  url: string;
  params?: any;
  // Removed color, headerToken
  skipToken?: boolean; // Kept for OTP calls that don't need a token
  skipAlert?: boolean;
}

const timeout = 30000; // Increased timeout to 30s

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  maxBodyLength: Infinity,
  headers: { "Content-Type": "application/json" },
});

// This function can be used to set the token globally after login
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};


export const commonApi = async ({
  method = ApiConstants.GET,
  url,
  params,
  skipToken = false,
  skipAlert = false,
}: CommonApiParams): Promise<AxiosResponse | any> => {
  
  // Set the token for the request if it's not skipped
  if (!skipToken) {
    // const token = await getToken(); // Get token from storage
    const token = null; // Placeholder: Replace with actual token retrieval logic
    setAuthToken(token);
  } else {
    setAuthToken(null); // Ensure no token is sent for public routes like OTP
  }

  const buildConfig = (): AxiosRequestConfig => {
    const cfg: AxiosRequestConfig = {
      headers: {
        "Content-Type":
          method === "POST_WITH_FORM"
            ? "multipart/form-data"
            : "application/json",
      },
      timeout,
    };
    if (method === "GET" || method === "DELETE") {cfg.params = params;}
    return cfg;
  };

  const requestFn = (config: AxiosRequestConfig) => {
    switch (method) {
      case ApiConstants.GET:
        return axiosInstance.get(url, config);
      case ApiConstants.POST:
      case ApiConstants.POST_WITH_FORM:
        return axiosInstance.post(url, params, config);
      case ApiConstants.PATCH:
        return axiosInstance.patch(url, params, config);
      case ApiConstants.PUT:
        return axiosInstance.put(url, params, config);
      case ApiConstants.DELETE:
        return axiosInstance.delete(url, config);
      default:
        return Promise.reject(new Error("Invalid HTTP method"));
    }
  };

  try {
    const config = buildConfig();
    console.log("[API CALL]", method, url, params);
    return await requestFn(config);
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      CustomAlert({
        message: "The request timed out.\nPlease try again.",
        showCancel: false,
      });
    }
    
    // Let the calling function (e.g., Redux thunk) handle the error details
    // by rejecting the promise.
    if (!skipAlert) {
        catchError(error as AxiosError);
    }
    
    // Return a consistent error structure
    return Promise.reject(error.response || error);
  }
};

const catchError = (error: AxiosError) => {
  if (error?.message === "Network Error") {
    showErrorDialog({ status: 0, message: "No internet connection" });
  } else if (error.response) {
    // You can handle global errors like 401 here if needed
    showErrorDialog(error.response);
  } else {
    showErrorDialog({ status: 500, message: "An unexpected error occurred" });
  }
};

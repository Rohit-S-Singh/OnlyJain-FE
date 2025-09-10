// src/redux/thunks/authThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { SEND_OTP, VERIFY_OTP } from "../../../api/EndPoints"; // Assuming you have these constants
import { handleApiThunk } from "../../../utils/responseParser";
import { commonApi } from "../../../api/CommonApi";
import { ApiConstants } from "../../../utils/constants";

interface SendOtpParams {
  phoneNumber: string;
}
interface VerifyOtpParams {
  phoneNumber: string;
  otp: string;
}

// POST - SEND OTP
export const postSendOtp = createAsyncThunk(
  SEND_OTP,
  async (params: SendOtpParams, { rejectWithValue }) =>
    handleApiThunk<any>(
      () =>
        commonApi({
          method: ApiConstants.POST,
          url: SEND_OTP,
          params,
          skipToken: true,
          skipAlert: true,
        }),
       undefined ,
      rejectWithValue
    )
);

// POST - VERIFY OTP
export const postVerifyOtp = createAsyncThunk(
  VERIFY_OTP,
  async (params: VerifyOtpParams, { rejectWithValue }) =>
    handleApiThunk<any>(
      () =>
        commonApi({
          method: ApiConstants.POST,
          url: VERIFY_OTP,
          params,
          skipToken: true,
          skipAlert: true,
        }),
       undefined ,
      rejectWithValue
    )
);
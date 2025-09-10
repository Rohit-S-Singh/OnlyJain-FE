/* eslint-disable quotes */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, SEND_OTP, VERIFY_OTP } from "../../../api/EndPoints";
import { handleApiThunk } from "../../../utils/responseParser";
import { commonApi } from "../../../api/CommonApi";
import { ApiConstants } from "../../../utils/constants";


//POST - SEND OTP
export const postSendOtp = createAsyncThunk(
  SEND_OTP,
  async (params: any, { rejectWithValue }) =>
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

//POST - VERIFY OTP
export const postVerifyOtp = createAsyncThunk(
  VERIFY_OTP,
  async (params: any, { rejectWithValue }) =>
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
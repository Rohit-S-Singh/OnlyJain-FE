// src/redux/slices/authSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {postSendOtp, postVerifyOtp} from '../thunks/authThunk';

// Define a type for your user object for better type safety
interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  isNewUser: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Define the shape of the successful payload from your verify OTP thunk
interface VerifyOtpFulfilledPayload {
  token: string;
  isNewUser: boolean;
  user: User | null; // User can be an object or null
}

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

const initialState: AuthState = {
  user: {
    id: '',
    name: '',
    phoneNumber: '',
    email: '',
    isNewUser: true,
    role: '',
    createdAt: '',
    updatedAt: '',
  },
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  otpSent: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action should be dispatched from your LoginScreen to store the number
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.phoneNumber = action.payload;
      } else {
        // Optionally, re-initialize user if null
        state.user = {...initialState.user, phoneNumber: action.payload};
      }
    },
    // This action can be called after a new user fills out their profile
    completeOnboarding: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.user.isNewUser = false;
    },
    // A simpler logout that resets the entire slice to its initial state
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      // Send OTP (No changes needed here)
      .addCase(postSendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSendOtp.fulfilled, state => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(postSendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify OTP (Corrected logic)
      .addCase(postVerifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        postVerifyOtp.fulfilled,
        (state, action: PayloadAction<VerifyOtpFulfilledPayload>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.otpSent = false;

          if (action.payload.user) {
            // Case 2: EXISTING USER - The payload has a user object.
            state.user = action.payload.user;
            state.user.isNewUser = false; // Explicitly mark them as not new
          } else {
            // Case 1: NEW USER - The payload has user: null.
            // We don't overwrite state.user. We just update the isNewUser flag.
            // The phone number is already in state.user.phoneNumber from the LoginScreen.
            state.user.isNewUser = true;
          }
        },
      )
      .addCase(postVerifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setPhoneNumber, logout, completeOnboarding} = authSlice.actions;
export default authSlice.reducer;

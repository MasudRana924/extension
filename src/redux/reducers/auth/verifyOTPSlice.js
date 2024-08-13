import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from '../../utilities/apiCaller';

// Define the async thunk for OTP verification
export const verifyOTP = createAsyncThunk(
  "otp/verify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/verify-otp", data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Create the slice
export const verifyOTPSlice = createSlice({
  name: "otpVerification",
  initialState: {
    isLoading: false,
    success: false,
    error: '',
    errorMessage:"",
  },
  extraReducers: (builder) => {
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = '';
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.errorMessage = action.payload;
    });
  },
});

export default verifyOTPSlice.reducer;
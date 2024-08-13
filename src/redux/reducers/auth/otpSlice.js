import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from "../../utilities/apiCaller";


// Async thunk for creating OTP
export const createOTP = createAsyncThunk(
  "/createOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/create-otp", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const otpSlice = createSlice({
  name: "otp",
  initialState: {
    isLoading: false,
    success: false,
    error: '',
    phoneNumber: '',
    pin: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOTP.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = null;
      state.phoneNumber = action.meta.arg.phone;
      state.pin = action.meta.arg.pin;
      // Save phone and pin to localStorage
      localStorage.setItem('phoneNumber', action.meta.arg.phoneNumber);
      localStorage.setItem('pin', action.meta.arg.pin);
    });
    builder.addCase(createOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default otpSlice.reducer;
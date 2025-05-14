import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  fullName: string;
  contactNumber: string;
  email: string;
}

interface BookingState {
  userInfo: UserInfo;
  hasAllergies: boolean | null;
  currentStep: number;
  totalSteps: number;
}

const initialState: BookingState = {
  userInfo: {
    fullName: '',
    contactNumber: '',
    email: '',
  },
  hasAllergies: null,
  currentStep: 1,
  totalSteps: 3,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setAllergies: (state, action: PayloadAction<boolean | null>) => {
      state.hasAllergies = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetBooking: () => initialState,
  },
});

export const { setUserInfo, setAllergies, nextStep, prevStep, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
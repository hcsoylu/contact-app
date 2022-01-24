import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../model/model";

type iState = {
  user: User | null;
};

const initialState: iState = {
  user: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;

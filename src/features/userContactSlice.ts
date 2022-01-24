import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../model/model";

type iState = {
  contacts: Contact[];
};

const initialState: iState = {
  contacts: [],
};

const userContactSlice = createSlice({
  name: "userContacts",
  initialState,
  reducers: {
    setContactData: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export default userContactSlice.reducer;
export const { setContactData, deleteContact, addContact } =
  userContactSlice.actions;

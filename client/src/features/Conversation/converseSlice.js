import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatPartner: null,
  conversationId: null,
  newReceiver: null,
};

const converseSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, action) => {
      return {
        ...state,
        chatPartner: action.payload.chatPartner,
        conversationId: action.payload.conversationId,
      };
    },
    setNewReceiver: (state, action) => {
      return { ...state, newReceiver: action.payload };
    },
  },
});

export default converseSlice.reducer;
export const { setChatPartner, setConversation } = converseSlice.actions;

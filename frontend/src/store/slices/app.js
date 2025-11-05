import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    modal: {
      isOpened: false,
      type: null,
      channelId: null,
    },
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channelId } = payload;
      state.modal.isOpened = true;
      state.modal.type = type;
      state.modal.channelId = channelId ?? null;
    },
    closeModal: (state) => {
      state.modal.isOpened = false;
      state.modal.type = null;
      state.modal.channelId = null;
    },
  },
});
export const { openModal, closeModal } = appSlice.actions;
export const app = appSlice.reducer;

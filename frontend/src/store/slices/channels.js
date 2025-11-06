import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChannel: {
    id: null,
    name: null,
  },
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload
    },
    resetCurrentChannel: (state) => {
      state.currentChannel = initialState.currentChannel
    },
  },
})
export const { setCurrentChannel, resetCurrentChannel } = channelsSlice.actions
export const channels = channelsSlice.reducer

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import { channelsApi } from '/src/api/channels.js'
import { messagesApi } from '/src/api/messages.js'
import { setCurrentChannel } from '/src/store/slices/channels.js'
import { store } from '/src/store/store.js'

function useSocket() {
  const dispatch = useDispatch()
  const socketUrl = import.meta.env.ENV === 'test'
    ? 'http://localhost:5002'
    : undefined

  useEffect(() => {
    const socket = io(socketUrl)

    socket.on('newMessage', () => store.dispatch(messagesApi.util.invalidateTags(['messages'])))
    socket.on('newChannel', () => store.dispatch(channelsApi.util.invalidateTags(['channels'])))
    socket.on('removeChannel', async ({ id }) => {
      store.dispatch(channelsApi.util.invalidateTags(['channels']))
      const channels = await store.dispatch(channelsApi.endpoints.getChannels.initiate()).unwrap()
      const state = store.getState()
      const currentChannel = state.channels.currentChannel
      const newCurrentChannel = currentChannel.id === id
        ? channels[0]
        : currentChannel
      store.dispatch(setCurrentChannel(newCurrentChannel))
    })
    socket.on('renameChannel', (data) => {
      store.dispatch(channelsApi.util.invalidateTags(['channels']))
      store.dispatch(setCurrentChannel(data))
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch, socketUrl])
}

export default useSocket

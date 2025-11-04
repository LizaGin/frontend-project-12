import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
// import { animateScroll } from 'react-scroll';

import { setCurrentChannel } from '../store/slices/channels.js';
import { useGetChannelsQuery } from '../api/channels.js';
import { useGetMessagesQuery } from '../api/messages.js';
import { ChannelsList } from '../components/ChannelsList.jsx';
import { MessagePanel } from '../components/MessagePanel.jsx';

export const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data: channels } = useGetChannelsQuery(undefined);
  const { data: messages } = useGetMessagesQuery(undefined);

  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const currentMessages = messages?.filter((m) => m.channelId === currentChannel.id);

  //   useEffect(() => {
  //     if (currentChannelId === defaultChannelId) {
  //       animateScroll.scrollToTop({ containerId: 'channels-box', delay: 0, duration: 0 });
  //     }
  //     if (currentChannelId === lastChannelsItemId) {
  //       animateScroll.scrollToBottom({ containerId: 'channels-box', delay: 0, duration: 0 });
  //     }
  //   }, [currentChannelId, lastChannelsItemId]);

  const handleAddChannel = () => {
    // dispatch(actions.openModal({ type: 'addChannel' }));
  };
  const handleRemoveChannel = (channelId) => () => {
    // dispatch(actions.openModal({ type: 'removeChannel', extra: { channelId } }));
  };
  const handleRenameChannel = (channelId) => () => {
    // dispatch(actions.openModal({ type: 'renameChannel', extra: { channelId } }));
  };

  useEffect(() => {
    if (channels && channels.length > 0 && !currentChannel.id) {
      const firstChannel = channels[0];
      dispatch(setCurrentChannel(firstChannel));
    }
  }, [channels, currentChannel.id, dispatch]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button type="button" variant="group-vertical" className="p-0 text-primary" onClick={handleAddChannel}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
        <ChannelsList channels={channels || []} currentChannel={currentChannel} handleRemove={handleRemoveChannel} handleRename={handleRenameChannel} />
      </div>
      <MessagePanel messages={currentMessages} channel={currentChannel} />
    </>
  );
};

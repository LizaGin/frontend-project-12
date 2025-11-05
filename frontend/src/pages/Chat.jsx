import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import { useGetChannelsQuery } from '/src/api/channels.js';
import { useGetMessagesQuery } from '/src/api/messages.js';
import { ChannelsList } from '/src/components/ChannelsList.jsx';
import { MessagePanel } from '/src/components/MessagePanel.jsx';
import { Modal } from '/src/components/modal/Modal.jsx';
import { openModal } from '/src/store/slices/app.js';
import { setCurrentChannel } from '/src/store/slices/channels.js';

export const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data: channels } = useGetChannelsQuery(undefined);
  const { data: messages } = useGetMessagesQuery(undefined);

  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const currentMessages = messages?.filter((m) => m.channelId === currentChannel.id);

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'add' }));
  };

  useEffect(() => {
    if (channels && channels.length > 0 && !currentChannel.id) {
      const firstChannel = channels[0];
      dispatch(setCurrentChannel(firstChannel));
    }
  }, [channels, currentChannel.id, dispatch]);

  return (
    <div className="d-flex container h-100">
      <div className="w-25 flex-column d-flex mt-4 mb-4 p-4 bg-light shadow-sm border border-1">
        <div className="d-flex justify-content-between mb-2">
          <b>{t('channels.channels')}</b>
          <Button type="button" variant="group-vertical" className="p-0 text-primary" onClick={handleAddChannel}>
            <PlusSquare size={20} />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <ChannelsList channels={channels || []} currentChannel={currentChannel} />
      </div>
      <div className="w-75 flex-column d-flex mt-4 mb-4 justify-content-between shadow-sm">
        <MessagePanel messages={currentMessages} channel={currentChannel} />
      </div>
      <Modal />
    </div>
  );
};

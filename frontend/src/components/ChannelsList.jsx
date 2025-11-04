import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setCurrentChannel } from '../store/slices/channels';

const Channel = ({ channel, isCurrent, handleRemove, handleRename }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const variant = isCurrent ? 'secondary' : undefined;

  const handleChooseChannel = () => {
    dispatch(setCurrentChannel(channel));
  };

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button type="button" key={channel.id} className="w-100 rounded-0 text-start text-truncate" onClick={handleChooseChannel} variant={variant}>
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">{t('channels.menu')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove(channel.id)}>{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={handleRename(channel.id)}>{t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button type="button" variant={variant} key={channel.id} className="w-100 rounded-0 text-start" onClick={handleChooseChannel}>
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export const ChannelsList = ({ channels, currentChannel, handleRemove, handleRename }) => {
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} isCurrent={channel.id === currentChannel.id} handleRemove={handleRemove} handleRename={handleRename} />
      ))}
    </ul>
  );
};

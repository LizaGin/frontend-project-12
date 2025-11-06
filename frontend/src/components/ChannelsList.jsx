import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { setCurrentChannel } from '/src/store/slices/channels.js'
import { openModal } from '/src/store/slices/app.js'

const Channel = ({ channel, isCurrent }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const variant = isCurrent
    ? 'secondary'
    : undefined

  const handleChooseChannel = () => {
    dispatch(setCurrentChannel(channel))
  }

  const handleRemoveChannel = channelId => () => dispatch(openModal({ type: 'remove', channelId }))
  const handleRenameChannel = channelId => () => dispatch(openModal({ type: 'rename', channelId }))

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable
        ? (
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button type="button" key={channel.id} className="w-100 rounded-start text-start text-truncate" onClick={handleChooseChannel} variant={variant}>
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                <span className="visually-hidden">{t('channels.menu')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleRemoveChannel(channel.id)}>{t('channels.remove')}</Dropdown.Item>
                <Dropdown.Item onClick={handleRenameChannel(channel.id)}>{t('channels.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        : (
            <Button type="button" variant={variant} key={channel.id} className="w-100 rounded-end text-start" onClick={handleChooseChannel}>
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
    </li>
  )
}

export const ChannelsList = ({ channels, currentChannel }) => {
  return (
    <ul id="channels-box" className="nav gap-1 flex-column nav-pills nav-fill overflow-auto d-flex justify-content-start align-items-start">
      {channels.map(channel => <Channel key={channel.id} channel={channel} isCurrent={channel.id === currentChannel.id} />)}
    </ul>
  )
}

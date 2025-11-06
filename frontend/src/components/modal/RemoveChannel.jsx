import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal as BootstrapModal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useRemoveChannelMutation } from '/src/api/channels.js'

export const RemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [removeChannel] = useRemoveChannelMutation()
  const channelId = useSelector(state => state.app.modal.channelId)

  const handleRemove = async () => {
    setLoading(true)
    removeChannel(channelId)
    toast.success(t('channels.removed'))
    handleClose()
  }

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.remove')}</BootstrapModal.Title>
        <Button variant="close" type="button" onClick={handleClose} aria-label="Close" data-bs-dismiss="modal" />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" type="button" onClick={handleClose} disabled={loading}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" type="button" onClick={handleRemove} disabled={loading}>
            {t('modals.confirm')}
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  )
}

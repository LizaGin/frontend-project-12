import { Modal as BootstrapModal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { closeModal } from '/src/store/slices/app.js'
import { AddChannel } from '/src/components/modal/AddChannel'
import { RemoveChannel } from '/src/components/modal/RemoveChannel'
import { RenameChannel } from '/src/components/modal/RenameChannel'

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
}

export const Modal = () => {
  const dispatch = useDispatch()
  const isOpened = useSelector(state => state.app.modal.isOpened)
  const modalType = useSelector(state => state.app.modal.type)

  const handleClose = () => {
    dispatch(closeModal())
  }

  if (!isOpened) return null

  const Component = modals[modalType]

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      <Component handleClose={handleClose} />
    </BootstrapModal>
  )
}

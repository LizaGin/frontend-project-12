import { useRef, useEffect } from 'react';
import { Modal as BootstrapModal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useGetChannelsQuery, useUpdateChannelMutation } from '/src/api/channels.js';

export const RenameChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery(undefined);
  const channelId = useSelector((state) => state.app.modal.channelId);
  const inputRef = useRef(null);
  const [updateChannel] = useUpdateChannelMutation();

  const channel = channels.find(({ id }) => channelId === id);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: async ({ name }) => {
      const data = { name, id: channelId };
      updateChannel(data);
      toast.success(t('channels.renamed'));
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.rename')}</BootstrapModal.Title>
        <Button variant="close" type="button" onClick={handleClose} aria-label="Close" data-bs-dismiss="modal" />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={f.isSubmitting}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">
              {t('modals.channelName')}
            </label>
            <Form.Control.Feedback type="invalid">{t(f.errors.name) || t(f.status)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" type="button" onClick={handleClose}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={f.isSubmitting}>
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

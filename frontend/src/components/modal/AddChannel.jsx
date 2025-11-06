import { Modal as BootstrapModal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useAddChannelMutation, useGetChannelsQuery } from '/src/api/channels.js';
import { useAutofocus } from '/src/hooks/useAutofocus.js';
import { setCurrentChannel } from '/src/store/slices/channels.js';

export const AddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery(undefined);
  const [addChannel] = useAddChannelMutation();
  const inputRef = useAutofocus();

  const channelsNames = channels.map((channel) => channel.name);

  const validationSchema = yup.object().shape({
    name: yup.string().trim().required('modals.required').min(3, 'modals.min').max(20, 'modals.max').notOneOf(channelsNames, 'modals.uniq'),
  });

  const handleAdd = async (name) => {
    try {
      const response = await addChannel({ name });
      dispatch(setCurrentChannel(response.data));
      toast.success(t('channels.created'));
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Network')) {
        toast.error(t('errors.network'));
      } else {
        toast.error(t('errors.unknown'));
      }
    }
  };

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      handleAdd(filter.clean(name));
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.add')}</BootstrapModal.Title>
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

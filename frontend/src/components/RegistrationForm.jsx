import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useAutofocus } from '/src/hooks/useAutofocus.js';

export const RegistrationForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const [registrationError, setRegistrationError] = useState();
  const inputRef = useAutofocus();

  const handleRegistration = async (values) => {
    try {
      await handleSubmit(values);
    } catch (error) {
      if (error.status === 409) {
        setRegistrationError(true);
      } else if (error.name === 'TypeError' && error.message.includes('Network')) {
        toast.error(t('errors.network'));
      } else {
        toast.error(t('errors.unknown'));
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required('signup.required').min(3, 'signup.usernameConstraints').max(20, 'signup.usernameConstraints'),
    password: yup.string().trim().required('signup.required').min(6, 'signup.passMin'),
    confirmPassword: yup.string().test('confirmPassword', 'signup.mustMatch', (value, context) => value === context.parent.password),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      if (formik.isValid) {
        handleRegistration(values);
      }
      setSubmitting(false);
    },
    validationSchema,
  });

  const isUsernameInvalid = (formik.errors.username && formik.touched.username && formik.values.username.length > 0) || registrationError;
  const isPasswordInvalid = formik.errors.password && formik.touched.password && formik.values.password.length > 0;
  const isConfirmPasswordInvalid = formik.errors.confirmPassword && formik.touched.confirmPassword && formik.values.confirmPassword.length > 0;

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={(e) => {
            formik.handleChange(e);
            setRegistrationError(false);
          }}
          value={formik.values.username}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={isUsernameInvalid}
          required
          ref={inputRef}
          placeholder={t('signup.username')}
        />
        <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {registrationError ? t('signup.alreadyExists') : t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          id="password"
          autoComplete="current-password"
          isInvalid={isPasswordInvalid}
          required
          placeholder={t('signup.password')}
        />
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {t(formik.errors.password)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          isInvalid={isConfirmPasswordInvalid}
          required
          placeholder={t('signup.password')}
        />
        <Form.Label htmlFor="confirmPassword">{t('signup.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('signup.submit')}
      </Button>
    </Form>
  );
};

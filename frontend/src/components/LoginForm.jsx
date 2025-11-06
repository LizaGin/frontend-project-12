import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useAutofocus } from '/src/hooks/useAutofocus.js';

export const LoginForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const [loginError, setLoginError] = useState();
  const inputRef = useAutofocus();

  const handleLogin = async (values) => {
    try {
      await handleSubmit(values);
    } catch (error) {
      if (error.status === 401) {
        setLoginError(true);
      } else if (error.name === 'TypeError' && error.message.includes('Network')) {
        toast.error(t('errors.network'));
      } else {
        toast.error(t('errors.unknown'));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      if (formik.isValid) {
        handleLogin(values);
      }
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">{t('login.enter')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={(e) => {
            formik.handleChange(e);
            setLoginError(false);
          }}
          value={formik.values.username}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={loginError}
          required
          ref={inputRef}
          placeholder={t('login.username')}
        />
        <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={(e) => {
            formik.handleChange(e);
            setLoginError(false);
          }}
          value={formik.values.password}
          name="password"
          id="password"
          autoComplete="current-password"
          required
          placeholder={t('login.password')}
          isInvalid={loginError}
        />
        <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
        {loginError && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('login.authFailed')}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('login.enter')}
      </Button>
    </Form>
  );
};

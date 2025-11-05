import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';

import { useAutofocus } from '/src/hooks/useAutofocus.js';

export const RegistrationForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const inputRef = useAutofocus();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      if (formik.isValid) {
        handleSubmit(values);
      }
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          id="username"
          autoComplete="username"
          //   isInvalid={authFailed}
          required
          ref={inputRef}
          placeholder={t('signup.username')}
        />
        <label htmlFor="username">{t('signup.username')}</label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          id="password"
          autoComplete="current-password"
          //   isInvalid={authFailed}
          required
          placeholder={t('signup.password')}
        />
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
        {/* {authFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('login.authFailed')}
          </Form.Control.Feedback>
        )} */}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="confirmPassword"
          id="confirmPassword"
          //   isInvalid={authFailed}
          required
          placeholder={t('signup.password')}
        />
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
        {/* {authFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('login.authFailed')}
          </Form.Control.Feedback>
        )} */}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('signup.submit')}
      </Button>
    </Form>
  );
};

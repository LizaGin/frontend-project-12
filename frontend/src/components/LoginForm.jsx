import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';

export const LoginForm = ({ handleSubmit }) => {
  const { t } = useTranslation();

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'required';
    }
    if (values.username) {
    }

    if (!values.password) {
      errors.password = 'required';
    }
    if (values.password) {
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      if (formik.isValid) {
        handleSubmit(values);
      }
      setSubmitting(false);
    },
    validate,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">{t('login.enter')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          id="username"
          autoComplete="username"
          //   isInvalid={authFailed}
          required
          //   ref={inputRef}
          placeholder={t('login.username')}
        />
        <label htmlFor="username">{t('login.username')}</label>
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
          placeholder={t('login.password')}
        />
        <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
        {/* {authFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('login.authFailed')}
          </Form.Control.Feedback>
        )} */}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('login.enter')}
      </Button>
    </Form>
  );
};

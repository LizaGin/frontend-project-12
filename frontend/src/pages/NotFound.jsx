import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/404.svg';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid row justify-content-center align-content-center h-75">
      <div className="col-md-8 col-xxl-6">
        <div className="text-center">
          <img alt={t('notFound.header')} className="img-fluid h-25" src={notFoundImage} />
          <h1 className="h4 text-muted">{t('notFound.header')}</h1>
          <p className="text-muted">
            {t('notFound.message')}
            <a href="/">{t('notFound.linkText')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

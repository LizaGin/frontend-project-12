import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/404.svg';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
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
        </div>
      </div>
    </div>
  );
};

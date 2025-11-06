import { useTranslation } from 'react-i18next'

import notFoundImage from '/src/assets/404.svg'

export const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-vh-75 d-flex flex-column justify-content-center align-items-center p-3">
      <div className="text-center" style={{ maxWidth: '600px' }}>
        <img alt={t('notFound.header')} className="img-fluid mb-3" style={{ maxHeight: '25vh' }} src={notFoundImage} />
        <h1 className="h4 text-muted">{t('notFound.header')}</h1>
        <p className="text-muted">
          {t('notFound.message')}
          <a href="/">{t('notFound.linkText')}</a>
        </p>
      </div>
    </div>
  )
}

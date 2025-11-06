import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'

import avatarImages from '/src/assets/avatar.jpg'
import { LoginForm } from '/src/components/LoginForm'
import { login } from '/src/store/slices/auth'

export const LoginPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    const { data: userData } = await axios.post('/api/v1/login', data)
    localStorage.setItem('user', JSON.stringify(userData))
    dispatch(login(userData))
    navigate('/')
  }

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5 g-0">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={avatarImages} className="rounded-circle" alt={t('login.header')} />
            </div>
            <LoginForm handleSubmit={handleSubmit} />
          </div>
          <div className="card-footer p-4 text-center">
            <span>{t('login.newToChat')}</span>
            <Link to="/signup">{t('login.signup')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { logout } from '/src/store/slices/auth.js'

export const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const logOut = () => {
    localStorage.removeItem('user')
    dispatch(logout())
  }

  const user = useSelector(state => state.auth)

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">
          {t('hexletChat')}
        </BootstrapNavbar.Brand>
        {!!user.token && <Button onClick={logOut}>{t('logout')}</Button>}
      </div>
    </BootstrapNavbar>
  )
}

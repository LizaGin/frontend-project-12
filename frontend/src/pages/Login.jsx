import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useRollbar } from '@rollbar/react';

import { LoginForm } from '../components/LoginForm';
import { login } from '../store/slices/authSlice';
import avatarImages from '../assets/avatar.jpg';

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // request token
    dispatch(login(data));
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatarImages} className="rounded-circle" alt={t('login.header')} />
              </div>
              <LoginForm handleSubmit={handleSubmit} />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span> <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

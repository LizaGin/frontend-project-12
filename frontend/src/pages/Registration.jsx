import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useRollbar } from '@rollbar/react';

import { login } from '../store/slices/auth';
import avatarImages from '../assets/avatar_1.jpg';
import { RegistrationForm } from '../components/RegistrationForm';

export const Registration = () => {
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
              <RegistrationForm handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

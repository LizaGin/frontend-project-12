import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from '/src/components/Header';
import { Chat } from '/src/pages/Chat';
import { LoginPage } from '/src/pages/Login';
import { NotFoundPage } from '/src/pages/NotFound';
import { Registration } from '/src/pages/Registration';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="/" element={user.token ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<Registration />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { NotFoundPage } from './pages/NotFound';
import { LoginPage } from './pages/Login';
import { Registration } from './pages/Registration';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NotFoundPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<Registration />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;

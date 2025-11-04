import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { NotFoundPage } from './pages/NotFound';
import { LoginPage } from './pages/Login';
import { Registration } from './pages/Registration';
import { Chat } from './pages/Chat';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="/" element={<Chat />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<Registration />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

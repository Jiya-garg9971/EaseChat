import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './components/home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chatpage from './components/chatpage';
import ChatProvider from './context/chatProvider';

function App() {
  return (
    <Router>
      <ChatProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;

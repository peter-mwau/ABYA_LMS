// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Reset_Password from './Reset_Password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register/" element={<Register />} />
        <Route path="reset_password/" element={<Reset_Password />} />
      </Routes>
    </Router>
  );
}

export default App;

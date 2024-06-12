import {BrowserRouter, Routes, Route,} from 'react-router-dom'

import RegisterPage from './Component/RegisterPage';
import LoginPage from './Component/LoginPage'
import Home from './Component/Home'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" Component={RegisterPage} />
        <Route exact path="/login" Component={LoginPage} />
        <Route exact path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 리액트 앱 코드 (App.js)
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Main from './Main';
import LoginForm from './LoginForm';
import JoinForm from './JoinForm';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/joinform" element={<JoinForm />} />
      </Routes>
    </div>
  );
};

export default App;
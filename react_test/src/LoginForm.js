import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const LoginForm = () => {
  return (
    <div>
      <div>로그인 페이지</div>
      <form>
        <input type='text' placeholder='아이디'></input>
        <input type='password' placeholder='비밀번호'></input>
        <input type='button' value={'로그인'}></input>
      </form>
      <div>
        <Link to="/joinform">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginForm;
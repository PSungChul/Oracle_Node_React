import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Add this import
import axios from 'axios';

const LoginForm = () => {
  // 아이디
  const [userId, setUserId] = useState('');
  // 비밀번호
  const [info, setInfo] = useState('');

  const loginId = (event) => {
    setUserId(event.target.value);
  };

  const loginInfo = (event) => {
    setInfo(event.target.value);
  };

  const btnLogin = (event) => {
    event.preventDefault();
    // 유효성 검사
    if (userId === '') {
      alert('아이디를 입력해 주세요.');
      return;
    }
    if (info === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    console.log(userId);
    console.log(info);
    // 회원가입 요청을 보낼 데이터 객체 생성
    const formData = {
      userId: userId,
      info: info
    };

    axios.post('/api/login', formData)
      .then((response) => {
        window.location.href='/';
      })
      .catch ((error) => {
        // 커스텀 에러 메시지 또는 기본 에러 메시지
        console.error('로그인 에러 : ', error.message);
        alert(error.response?.data?.error);
      });
  };

  return (
    <div>
      <div>로그인 페이지</div>
      <form onSubmit={btnLogin}>
        <input type='text' placeholder='아이디' onChange={loginId}></input>
        <input type='password' placeholder='비밀번호' onChange={loginInfo}></input>
        <input type='submit' value={'로그인'}></input>
      </form>
      <div>
        <Link to="/joinform">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginForm;
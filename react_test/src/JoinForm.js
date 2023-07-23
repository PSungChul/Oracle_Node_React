import React, {useState} from 'react';
import axios from 'axios';

const JoinForm = () => {
  // 아이디
  const [userId, setUserId] = useState('');
  const [hUserId, setHUserId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState('');
  // 비밀번호
  const [info, setInfo] = useState('');
  const [isInfo, setIsInfo] = useState('');
  const [hInfo, setHInfo] = useState('');
  const [isHInfo, setIsHInfo] = useState('');
  // 이름
  const [name, setName] = useState('');

  const changeDuplicateId = (event) => {
    setUserId(event.target.value);
    if (hUserId !== '') {
      setHUserId('');
    }
  };

  const changeInfo = (event) => {
    let pattern1 = /[0-9]/; // 숫자 입력
    let pattern2 = /[a-zA-Z]/; // 영어 소문자, 대문자 입력
    let pattern3 = /[~!@#$%^&*()_+]/; // 특수기호 입력
    console.log(event.target.value.length);

    if (!pattern1.test(event.target.value) || !pattern2.test(event.target.value) || !pattern3.test(event.target.value) || event.target.value.length < 5) {
      setIsInfo('영문, 숫자, 특수기호(~!@#$%^&*()_+)를 포함하여 5자리 이상으로 구성하여야 합니다');
    } else {
      setIsInfo('');
      setInfo(event.target.value);
    }

    if (event.target.value !== hInfo) {
      setIsHInfo('비밀번호가 일치하지 않습니다');
    } else {
      setIsHInfo('');
      setHInfo(event.target.value);
    }
  };

  const changeHInfo = (event) => {
    setHInfo(event.target.value);

    if (event.target.value !== info) {
      setIsHInfo('비밀번호가 일치하지 않습니다');
    } else {
      setIsHInfo('');
      setHInfo(event.target.value);
    }
  }

  const changeName = (event) => {
    setName(event.target.value);
    console.log(event.target.value.length);
    if (event.target.value.length > 5) {
      alert('이름은 5글자 이하로 작성해주세요.');
    }
  }

  const btnDuplicateIdCheck = async () => {
    try {
      // 노드 서버로 아이디 중복 확인 요청
      const response = await axios.get(`/api/duplicateIdCheck/${userId}`);
      alert(response.data.isDuplicate);
      // 중복 여부에 따라 상태를 업데이트
      if (response.data.isDuplicate === '사용 가능한 아이디 입니다.') {
        setIsDuplicate('');
        setHUserId(userId);
      } else {
        setIsDuplicate(response.data.isDuplicate);
        setHUserId('');
      }
    } catch (error) {
      console.error('아이디 중복 확인 에러 : ', error);
    }
  };

  const btnJoin = (event) => {
    event.preventDefault();
    // 유효성 검사
    if (hUserId === '') {
      alert('아이디 중복확인을 해주세요');
      return;
    }
    if (isInfo !== '') {
      alert(isInfo);
      return;
    }
    if (isHInfo !== '') {
      alert(isHInfo);
      return;
    }
    if (name === '') {
      alert('이름을 입력하세요.');
      return;
    }
    
    // 회원가입 요청을 보낼 데이터 객체 생성
    const formData = {
      userId: userId,
      info: info,
      name: name,
    };

    axios.post('/api/join', formData)
      .then((response) => {
        window.location.href='/';
      })
      .catch ((error) => {
        console.error('회원가입 에러 : ', error);
      });
  };

  return (
    <div>
      <div>회원가입 페이지</div>
      <form onSubmit={btnJoin}>
        <ul>
          <li><label>아이디 : </label><input type='text' placeholder='아이디' onChange={changeDuplicateId}></input>
                                    <input type='button' value={'중복확인'} onClick={btnDuplicateIdCheck}></input></li>
          {isDuplicate}
          <li><label>비밀번호 : </label><input type='password' placeholder='비밀번호' onChange={changeInfo}></input></li>
          {isInfo}
          <li><label>비밀번호 확인 : </label><input type='password' placeholder='비밀번호 확인' onChange={changeHInfo}></input></li>
          {isHInfo}
          <li><label>이름 : </label><input type='text' placeholder='이름' onChange={changeName}></input></li>
          <input type='submit' value={'가입하기'}></input>
        </ul>
      </form>
    </div>
  );
};

export default JoinForm;
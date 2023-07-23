// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Add this import

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 노드 서버로 데이터 요청 보내기
    axios.get('/api/data')
      .then((response) => {
        setData(response.data);
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data.map((item) => (
        // 명시된 컬럼 데이터만 조회할 경우
        <div key={item[0]}>
          <p>{item[1] || 'no_id'} - {item[2]}</p>
        </div>
        // // * 로 모든 컬럼 데이터를 조회할 경우
        // <div key={item.idx}>
        //   <p>{item.id || 'no_id'} - {item.name}</p>
        // </div>
      ))}
      <div>
        <Link to="/loginform">로그인</Link>
      </div>
    </div>
  );
};

export default Main;
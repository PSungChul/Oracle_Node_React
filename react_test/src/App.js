// 리액트 앱 코드 (App.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
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
          <p>{item[2] || 'no_id'} - {item[1]}</p>
          <p>Main Title: {item[3]}</p>
          <p>Main Text: {item[4]}</p>
        </div>
        // // * 로 모든 컬럼 데이터를 조회할 경우
        // <div key={item.idx}>
        //   <p>{item.id || 'no_id'} - {item.name}</p>
        //   <p>Main Title: {item.mainTitle}</p>
        //   <p>Main Text: {item.mainText}</p>
        // </div>
      ))}
    </div>
  );
};

export default App;
const express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('./dbConfig');

const app = express();

// DB 연결 설정
async function initialize() {
  try {
    await oracledb.createPool(dbConfig);

    console.log('OracleDB 연결 성공');
  } catch (error) {
    console.error('OracleDB 연결 실패', error);
  }
}

initialize();

// 데이터 조회 API 엔드포인트
app.get('/api/data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT idx, name, userId, mainTitle, mainText FROM SignUp');
    console.log('데이터 조회 결과:', result.rows);
    connection.release();

    // 명시된 컬럼 데이터만 조회할 경우
    // 조회된 데이터를 JSON 형식으로 응답
    res.json(result.rows);

    // // * 로 모든 컬럼 데이터를 조회할 경우
    // // 필요한 필드만 미리 선택하여 데이터 전송
    // const filteredData = result.rows.map((item) => ({
    //   idx: item[0],
    //   id: item[2],
    //   name: item[1],
    //   mainTitle: item[13],
    //   mainText: item[15]
    //   // 다른 필드가 있다면 이곳에 추가
    // }));
    // // 선택된 필드만 JSON 형식으로 응답
    // res.json(filteredData);
  } catch (error) {
    console.error('데이터 조회 에러', error);
    res.status(500).json({ error: '데이터 조회 에러' });
  }
});

// 서버 리스닝
const port = process.env.PORT || 4000; // 포트 번호 변경
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
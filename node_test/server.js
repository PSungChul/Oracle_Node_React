const express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('./dbConfig');

const app = express();
// JSON 파싱 미들웨어 추가
app.use(express.json());

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

// 데이터 전체 조회 API 엔드포인트
app.get('/api/data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT idx, userId, name FROM Sign');
    console.log('데이터 조회 결과:', result.rows);

    // DB 연결 해제
    connection.release();

    // 명시된 컬럼 데이터만 조회할 경우
    // 조회된 데이터를 JSON 형식으로 응답
    res.json(result.rows);

    // // * 로 모든 컬럼 데이터를 조회할 경우
    // // 필요한 필드만 미리 선택하여 데이터 전송
    // const filteredData = result.rows.map((item) => ({
    //   idx: item[0],
    //   id: item[1],
    //   name: item[3]
    //   // 다른 필드가 있다면 이곳에 추가
    // }));
    // // 선택된 필드만 JSON 형식으로 응답
    // res.json(filteredData);
  } catch (error) {
    console.error('데이터 조회 에러', error);
    res.status(500).json({ error: '데이터 조회 에러' });
  }
});

// 아이디 중복 확인 API 엔드포인트
app.get('/api/duplicateIdCheck/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    const connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT userId FROM Sign WHERE userId = :userId', [userId]);
    let isDuplicate = '';
    if (result.rows.length === 0) {
      isDuplicate = '사용 가능한 아이디 입니다.';
    } else {
      isDuplicate = '중복된 아이디 입니다.';
    }

    // DB 연결 해제
    connection.release();

    res.json({isDuplicate});
  } catch (error) {
    console.error('아이디 중복 확인 에러', error);
    res.status(500).json({error: '아이디 중복 확인 에러'});
  }
});

// JSON 파싱 미들웨어 추가
app.use(express.json());

// 회원가입 API 엔드포인트
app.post('/api/join', async (req, res) => {
  try {
    // 클라이언트로부터 받은 form 데이터 추출
    const {userId, info, name} = req.body;

    // DB 연결
    const connection = await oracledb.getConnection();

    // 마지막 아이디 중복 체크
    const duplicateResult = await connection.execute('SELECT userId FROM Sign WHERE userId = :userId', [userId]);
    if (duplicateResult.rows.length > 0) {
      // 중복된 아이디가 이미 존재하는 경우
      connection.release();
      return res.status(400).json({ error: '중복된 아이디가 이미 존재합니다.' });
    }

    // 회원가입 정보를 DB에 삽입
    await connection.execute('INSERT INTO Sign (idx, userId, info, name) VALUES (seq_join_idx.nextval, :userId, :info, :name)', [userId, info, name]);

    // 커밋 수행
    await connection.commit();

    // DB 연결 해제
    connection.release();

    // 회원가입 성공 응답
    res.json({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 에러', error);
    res.status(500).json({ error: '회원가입 에러' });
  }
});

// 서버 리스닝
const port = process.env.PORT || 4000; // 포트 번호 변경
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
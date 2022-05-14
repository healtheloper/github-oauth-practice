const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 7007;
const jwtPrivateKey = 'fakePrivateKey';

const fakeUsers = [];
const fakeComments = [];

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hi');
});

app.post('/uploadComment', (req, res) => {
  try {
    const { authorization } = req.headers;
    const { comment } = req.body;
    const [, token] = authorization.split(' ');
    const userId = jwt.verify(token, jwtPrivateKey);
    const isExistUserId = fakeUsers.find((user) => user.id === userId);
    if (!isExistUserId) {
      throw Error('존재하지 않은 유저정보입니다.');
    }
    fakeComments.push({ userId, comment });
    res.send({
      ok: true,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
});
app.get('/comments', (req, res) => {
  try {
    res.send({
      ok: true,
      comments: fakeComments,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
});

app.post('/join', (req, res) => {
  try {
    const { id, password } = req.body;
    const isExistUser = fakeUsers.find((user) => user.id === id);
    if (isExistUser) {
      throw Error('이미 존재하는 유저');
    }
    fakeUsers.push({ id, password });
    res.send({
      ok: true,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
});

app.post('/login', (req, res) => {
  try {
    const { id, password } = req.body;
    const user = fakeUsers.find((user) => user.id === id);

    if (!user) {
      throw Error('해당하는 ID의 유저가 없습니다.');
    }
    if (user.password !== password) {
      throw Error('비밀번호가 틀렸습니다.');
    }
    const token = jwt.sign(id, jwtPrivateKey);
    res.send({
      ok: true,
      token,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server Listening On http://localhost:${PORT}`);
});

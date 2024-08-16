var mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "", // 데이터베이스 비밀번호
  database: "test", // 사용할 데이터베이스
});
const dbc = mysql.createPool({
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "", // 데이터베이스 비밀번호
  database: "test", // 사용할 데이터베이스
});

// 글 목록 조회 함수
const getPostListFromDatabase = (callback) => {
  const sql = `
    SELECT posts.id, posts.title, posts.tag, posts.views, posts.likes, posts.comments, posts.created_at, users.nickname
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
  `;

  dbc.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getPostFromDatabase = (callback) => {
  const sql = `
    SELECT posts.id, posts.title, posts.content, posts.category, posts.tag, posts.views, posts.likes, posts.comments, posts.created_at, users.nickname, users.profileimage
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
  `;

  dbc.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { db, dbc, getPostListFromDatabase };

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const { db, dbc, getPostListFromDatabase } = require("./config/db.js");

app.use(cors());

const SECRET_KEY = "hj";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 로그인
app.post("/login", (req, res) => {
  const username = req.body.username;
  const pw = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, data) => {
      if (!err) {
        if (data.length > 0) {
          const password = data[0].password;
          const isPasswordMatch = password === pw; // 비밀번호 비교
          const id = data[0].id;

          // 암호화한 토큰 반환
          const token = jwt.sign({ username, id }, SECRET_KEY);

          res.send({ username, token, isPasswordMatch });
        } else {
          res.send({ error: "User not found" });
        }
      } else {
        console.log(err);
        res.send({ error: "An error occurred" });
      }
    }
  );
});

// 회원가입 아이디 중복확인
app.post("/join/username", (req, res) => {
  const username = req.body.UserName;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, data) => {
      if (!err) {
        if (data.length > 0) {
          const isDuplicated = true;
          res.send({ isDuplicated });
        } else {
          const isDuplicated = false;
          res.send({ isDuplicated });
        }
      } else {
        console.log(err);
        res.send({ error: "An error occurred" });
      }
    }
  );
});

// 회원가입 닉네임 중복확인
app.post("/join/nn", (req, res) => {
  const nn = req.body.Nickname;

  db.query("SELECT * FROM users WHERE nickname = ?", [nn], (err, data) => {
    if (!err) {
      if (data.length > 0) {
        const isDuplicated = true;
        res.send({ isDuplicated });
      } else {
        const isDuplicated = false;
        res.send({ isDuplicated });
      }
    } else {
      console.log(err);
      res.send({ error: "An error occurred" });
    }
  });
});

// 회원가입
app.post("/join/joinMembership", (req, res) => {
  const newUser = {
    username: req.body.Username,
    password: req.body.Password,
    nickname: req.body.Nickname,
    email: req.body.Email,
  };
  const query = "INSERT INTO users SET ?";
  dbc.query(query, newUser, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
    } else {
      console.log("Data inserted successfully!");
    }
  });
});

// 토큰 유효 확인
app.post("/user", (req, res) => {
  const token = req.body.token;

  // 토큰 검증
  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.json({ isValidToken: false });
    } else {
      // 토큰이 유효한 경우
      const username = decoded.username;
      // TODO: 해당 유저 정보를 가져오거나 필요한 작업 수행
      res.json({ isValidToken: true, username });
    }
  });
});

// 클라이언트로 프로필 내보내기
app.post("/profile/get", (req, res) => {
  const token = req.body.token;

  // 토큰 검증
  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.send({ error: "토큰 !유효" });
    } else {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [decoded.username],
        (err, data) => {
          if (!err) {
            if (data.length > 0) {
              const loginState = true;
              const nickname = data[0].nickname;
              const email = data[0].email;
              const point = data[0].point;

              res.send({ loginState, nickname, email, point });
            } else {
              const loginState = false;
              res.send({ loginState });
            }
          } else {
            console.log(err);
            res.send({ error: "An error occurred" });
          }
        }
      );
    }
  });
});
// 클라이언트에서 프로필 받아 수정하기
app.post("/profile/set", (req, res) => {
  const token = req.body.token;
  const email = req.body.email;
  const nickname = req.body.nickname;

  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.send({ error: "토큰 !유효" });
    } else {
      const query =
        "UPDATE users SET email = ?, nickname = ? WHERE username = ?";
      dbc.query(query, [email, nickname, decoded.username], (err, result) => {
        if (err) {
          const sendResult = false;
          console.log(err);
          res.send({ sendResult });
        } else {
          const sendResult = true;
          console.log(result);
          res.send({ sendResult });
        }
      });
    }
  });
});
// 회원 탈퇴
app.post("/withdrawal", (req, res) => {
  const token = req.body.token;

  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.send({ error: "토큰 !유효" });
    } else {
      const query = "DELETE FROM users WHERE username = ?";
      dbc.query(query, decoded.username, (err, result) => {
        if (!err) {
          const sendResult = true;
          console.log(err);
          res.send({ sendResult });
        } else {
          const sendResult = false;
          console.log(result);
          res.send({ sendResult });
        }
      });
    }
  });
});

// 포인트 증가하는 버튼
app.post("/pointUp", (req, res) => {
  const token = req.body.token;

  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.send({ error: "토큰 !유효" });
    } else {
      // 기존 포인트 조회
      const selectQuery = "SELECT point FROM users WHERE username = ?";
      dbc.query(selectQuery, [decoded.username], (selectErr, selectResult) => {
        if (selectErr) {
          console.log(selectErr);
          res.send({ sendResult: false });
        } else {
          // 포인트 업데이트
          const updateQuery = "UPDATE users SET point = ? WHERE username = ?";
          dbc.query(
            updateQuery,
            [selectResult[0].point + 1, decoded.username],
            (updateErr, updateResult) => {
              if (updateErr) {
                console.log(updateErr);
                res.send({ sendResult: false });
              } else {
                console.log(updateResult);
                res.send({ sendResult: true });
              }
            }
          );
        }
      });
    }
  });
});

// 글 목록 조회 라우트
app.get("/postlist/get", (req, res) => {
  getPostListFromDatabase((err, results) => {
    if (err) {
      console.error("Error retrieving post list:", err);
      res.status(500).json({ error: "Error retrieving post list" });
      return;
    }

    res.json(results);
  });
});

// 클라이언트로 게시글 내보내기
app.post("/post/get", (req, res) => {
  const id = req.body.id;

  const query =
    "SELECT posts.id, posts.title, posts.content, posts.category, posts.tag, posts.views, posts.likes, posts.comments, posts.created_at, users.nickname, users.profileimage FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = ?";
  db.query(query, [id], (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
      res.send({ error: "An error occurred" });
    }
  });
});
// 게시글 개추
app.post("/post/like", (req, res) => {
  const id = req.body.id;

  const query = "UPDATE posts SET `likes` = `likes` + 1 WHERE id = ?;";
  db.query(query, [id], (err, data) => {
    if (!err) {
      console.log(data);
    } else {
      console.log(err);
      res.send({ error: "An error occurred" });
    }
  });
});
// 서버에 게시글 등록하기
app.post("/post/submit", (req, res) => {
  const token = req.body.token;

  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.send({ error: "토큰 !유효" });
    } else {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category.value,
        tag: req.body.tag.value,
        user_id: decoded.id,
      };
      const query = "INSERT INTO posts SET ?";
      db.query(query, newPost, (err, data) => {
        if (!err) {
          const isertedId = data.insertId;
          res.json(isertedId);
        } else {
          console.log(err);
          res.send({ error: "An error occurred" });
        }
      });
    }
  });
});

// 클라이언트로 댓글 내보내기
app.post("/comment/get", (req, res) => {
  const id = req.body.id;

  const query =
    "SELECT comments.id, comments.content, comments.likes, comments.created_at, comments.parent_comment_id, users.nickname, users.profileimage FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = ?";
  db.query(query, [id], (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
      res.send({ error: "An error occurred" });
    }
  });
});
// 서버에 댓글 등록하기
app.post("/comment/submit", (req, res) => {
  const token = req.body.token;

  jwt.verify(token, "hj", (err, decoded) => {
    if (err) {
      // 토큰이 유효하지 않을 경우
      res.send({ error: "토큰 !유효" });
    } else {
      const newComment = {
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: decoded.id,
      };
      const query = "INSERT INTO comments SET ?";
      db.query(query, newComment, (err, data) => {
        if (!err) {
          // 댓글 등록 성공 시, 해당 게시물의 댓글 수 업데이트
          const updateQuery =
            "UPDATE posts SET `comments` = `comments` + 1 WHERE id = ?";
          db.query(updateQuery, [req.body.post_id], (err, updateData) => {
            if (!err) {
              console.log(updateData);
            } else {
              console.log(err);
              res.send({
                error: "An error occurred while updating post's comment count",
              });
            }
          });
        } else {
          console.log(err);
          res.send({ error: "An error occurred" });
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http//localhost:${PORT}`);
});

// cd src/server && node server.js
// node server.js

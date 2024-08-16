import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  height: 550px;
  margin-top: 50px;
  border: 1px solid rgb(198, 198, 198);
  border-radius: 10px;
`;
const DataInput = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 50px;
  border: 1px solid rgb(198, 198, 198);
  border-radius: 10px;
  margin: 10px;

  button {
    border: 0px;
    border-radius: 10px;
    background-color: rgb(30, 200, 0);
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 250px;
  font-size: 15px;
  border: 0px solid rgb(218, 218, 218);
  &:focus {
    outline: none;
  }
`;

const JoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 60px;
  background-color: rgb(30, 200, 0);
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

function Join() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [nn, setNn] = useState("");
  const EmailChange = (e) => {
    setEmail(e.target.value);
  };
  const UsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const PwChange = (e) => {
    setPw(e.target.value);
  };
  const NnChange = (e) => {
    setNn(e.target.value);
  };

  const url = "http://localhost:4000/join";

  const [notice, setNotice] = useState("");
  const [isusernameabled, setIsusernameable] = useState(false);
  const [isnnabled, setIsnnable] = useState(false);

  // 아이디 길이 and 중복 확인
  const checkusernameDuplicated = async () => {
    if (username.length > 13) {
      setNotice("12자 이하로 입력해주세요.");
      setIsusernameable(false);
    } else if (username.length < 6) {
      setNotice("6자 이상 입력해주세요.");
      setIsusernameable(false);
    } else {
      const data = {
        UserName: username,
      };
      axios
        .post(url + "/username", data)
        .then((response) => {
          const isDuplicated = response.data.isDuplicated;
          if (isDuplicated) {
            setNotice("중복 된 아이디입니다.");
            setIsusernameable(false);
          } else {
            setNotice("사용 가능한 아이디입니다.");
            setIsusernameable(true);
          }
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Request failed, handle the error
          console.error("Error:", error);
        });
    }
  };

  // 닉네임 길이 and 중복 확인
  const checknnDuplicated = async () => {
    if (nn.length > 13) {
      setNotice("12자 이하로 입력해주세요.");
      setIsnnable(false);
    } else if (nn.length < 3) {
      setNotice("3자 이상 입력해주세요.");
      setIsnnable(false);
    } else {
      const data = {
        Nickname: nn,
      };
      axios
        .post(url + "/nn", data)
        .then((response) => {
          const isDuplicated = response.data.isDuplicated;
          if (isDuplicated) {
            setNotice("중복 된 닉네임입니다.");
            setIsnnable(false);
          } else {
            setNotice("사용 가능한 닉네임입니다.");
            setIsnnable(true);
          }
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Request failed, handle the error
          console.error("Error:", error);
        });
    }
  };

  // 회원가입
  const joinMembership = async () => {
    if (isnnabled && isusernameabled) {
      const data = {
        Username: username,
        Password: pw,
        Nickname: nn,
        Email: email,
      };
      axios.post(url + "/joinMembership", data).catch((error) => {
        // Request failed, handle the error
        console.error("Error:", error);
      });
      window.location.href = "/login";
    } else {
      setNotice("아이디 또는 닉네임이 중복되었습니다.");
    }
  };
  return (
    <Page>
      <JoinBox>
        <h2>회원가입</h2>
        <DataInput>
          <div style={{ margin: "10px" }}>✅</div>
          <Input
            type="text"
            name="email"
            placeholder=" 이메일"
            value={email}
            onChange={EmailChange}
          />
        </DataInput>
        <DataInput className="up">
          <div style={{ margin: "10px" }}>💚</div>
          <Input
            type="text"
            name="username"
            placeholder=" 아이디"
            value={username}
            onChange={UsernameChange}
          />
          <button onClick={checkusernameDuplicated}>중복 확인</button>
        </DataInput>
        <DataInput>
          <div style={{ margin: "10px" }}>🔒</div>
          <Input
            type="password"
            name="pw"
            placeholder=" 비밀번호"
            value={pw}
            onChange={PwChange}
          />
        </DataInput>
        <DataInput>
          <div style={{ margin: "10px" }}>😊</div>
          <Input
            type="text"
            name="nn"
            placeholder=" 닉네임"
            value={nn}
            onChange={NnChange}
          />
          <button onClick={checknnDuplicated}>중복 확인</button>
        </DataInput>
        <h3 style={{ color: isusernameabled || isnnabled ? "green" : "red" }}>
          {notice}
        </h3>
        <JoinButton onClick={joinMembership}>
          <b>회원가입</b>
        </JoinButton>
      </JoinBox>
    </Page>
  );
}

export default Join;

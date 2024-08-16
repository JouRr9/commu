import styled from "styled-components";
import axios from "axios";
import Cookie from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../Slice/userSlice";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  height: 310px;
  margin-top: 50px;
  border: 1px solid rgb(198, 198, 198);
  border-radius: 10px;
`;
const Idpw = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 100px;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 10px;
`;
const LoginInput = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 50px;
  &.up {
    border-bottom: 1px solid rgb(218, 218, 218);
  }
  button {
    margin-left: 50px;
    background-color: rgb(150, 150, 150);
    color: white;
    border: 0px;
    border-radius: 100px;
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
const LoginKeep = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 50px;
`;
const LoginButton = styled.button`
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

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //아이디 비밀번호 한번에 지우기
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const IdChange = (e) => {
    setId(e.target.value);
  };
  const PwChange = (e) => {
    setPw(e.target.value);
  };
  const IdReset = () => {
    setId("");
  };
  const PwReset = () => {
    setPw("");
  };

  //로그인 상태 유지 체크
  const [isKeeping, setIsKeeping] = useState(false);
  const KeepingCheckboxChange = () => {
    setIsKeeping(!isKeeping);
  };
  //IP보안 체크
  const [isIpChecked, setIsChecked] = useState(false);
  const ipCheckboxChange = () => {
    setIsChecked(!isIpChecked);
  };

  const Trylogin = async () => {
    // Define the URL to which the POST request will be sent
    const url = "http://localhost:4000/login";

    // Data to be sent as the request payload (plain object in this case)
    const data = {
      username: id,
      password: pw,
    };

    // Make the POST request using axios.post
    axios
      .post(url, data)
      .then((response) => {
        const isPasswordMatch = response.data.isPasswordMatch;
        if (isPasswordMatch) {
          // 비밀번호가 일치하는 경우 처리
          Cookie.set("token", response.data.token);
          //dispatch(setUserId({ userId: response.data.username }));
          alert("로그인 성공!");
          window.location.href = "/";
        } else {
          // 비밀번호가 일치하지 않는 경우 처리
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Request failed, handle the error
        console.error("Error:", error);
      });
  };

  return (
    <Page>
      <LoginBox>
        <h2>ID 로그인</h2>
        <Idpw>
          <LoginInput className="up">
            <div style={{ margin: "10px" }}>💚</div>
            <Input
              type="text"
              name="id"
              placeholder=" 아이디"
              value={id}
              onChange={IdChange}
            />
            <button onClick={IdReset}>x</button>
          </LoginInput>
          <LoginInput>
            <div style={{ margin: "10px" }}>🔒</div>
            <Input
              type="password"
              name="pw"
              placeholder=" 비밀번호"
              value={pw}
              onChange={PwChange}
            />
            <button onClick={PwReset}>x</button>
          </LoginInput>
        </Idpw>
        <LoginKeep>
          <div>
            <input
              type="checkbox"
              id="keep"
              name="agree"
              checked={isKeeping}
              onChange={KeepingCheckboxChange}
            />
            <label style={{ cursor: "pointer" }} htmlFor="keep">
              로그인 상태 유지
            </label>
          </div>
          <div>
            <label style={{ cursor: "pointer" }} htmlFor="ip">
              IP보안
            </label>
            <input
              type="checkbox"
              id="ip"
              name="agree"
              checked={isIpChecked}
              onChange={ipCheckboxChange}
            />
          </div>
        </LoginKeep>
        <LoginButton onClick={Trylogin}>
          <b>로그인</b>
        </LoginButton>
      </LoginBox>
    </Page>
  );
}
export default Login;

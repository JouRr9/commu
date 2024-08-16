import styled from "styled-components";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const NavBar = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  border-bottom: 1px solid rgb(217, 217, 217);
`;
const AA = styled.div`
  display: flex;
  width: 1200px;
  height: 100%;
  justify-content: right;
  div {
    margin: 5px 10px;
    font-size: 18px;
  }
  button {
    background-color: white;
    border: 0px;
    font-size: 18px;
    cursor: pointer;
  }
`;
const Slink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Navigationbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Define the URL to which the POST request will be sent
      const url = "http://localhost:4000/user";

      // Data to be sent as the request payload (plain object in this case)
      const data = {
        token: Cookie.get("token"),
      };

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((response) => {
          if (response.data.isValidToken) {
            setIsLoggedIn(response.data.isValidToken);
          } else {
            setIsLoggedIn(response.data.isValidToken);
          }
        });
    };

    checkLoginStatus(); // 페이지가 로드될 때 로그인 상태를 확인합니다.
  }, []);

  // 로그아웃 처리를 하는 함수 (예시)
  const handleLogout = () => {
    // 로그아웃 처리 후 isLoggedIn을 false로 설정
    setIsLoggedIn(false);
    //새로고침
    Cookie.remove("token");
    window.location.reload();
  };
  const handlePointUp = () => {
    const url = "http://localhost:4000/pointUp";

    // Data to be sent as the request payload (plain object in this case)
    const data = {
      token: Cookie.get("token"),
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        alert("포인트 1 증가");
      });
  };
  const handleCheckingLog = () => {
    console.log(Cookie.get("token"));
  };

  return (
    <NavBar>
      {isLoggedIn ? (
        <AA>
          <div>
            <button onClick={handlePointUp}>포인트 업!</button>
          </div>
          <div>
            <button onClick={handleCheckingLog}>로그확인</button>
          </div>
          <div>
            <Slink to="/mypage">마이페이지</Slink>
          </div>
          <div>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </AA>
      ) : (
        <AA>
          <div>
            <button onClick={handleCheckingLog}>로그확인</button>
          </div>
          <div>
            <Slink to="/join">회원가입</Slink>
          </div>
          <div>
            <Slink to="/login">로그인</Slink>
          </div>
        </AA>
      )}
    </NavBar>
  );
}
export default Navigationbar;

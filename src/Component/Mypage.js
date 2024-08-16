import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";

const Frame = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 1200px;
  margin-top: 10px;
  //border: 1px solid black;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  width: 296px;
  height: 60px;
  margin: 2px;
  background-color: white;
  border: 1px solid rgb(222, 222, 222);
  font-size: 18px;
  &:hover {
    background-color: rgb(240, 240, 240);
    border: 1px solid rgb(210, 210, 210);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
`;
const Title = styled.h1`
  display: flex;
  width: 1200px;
  margin: 10px;
`;
const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
`;
const InputBox = styled.div`
  justify-content: right;
  width: 550px;
  height: 300px;
`;
const Input = styled.input`
  width: 536px;
  height: 60px;
  background-color: rgb(240, 240, 240);
  border: 1px solid rgb(210, 210, 210);
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  padding-left: 10px;
`;
const FixButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 60px;
  margin-bottom: 30px;
  background-color: rgb(222, 222, 222);
  border: 0px solid rgb(222, 222, 222);
  border-radius: 10px;
  font-size: 18px;
  &.special {
    background-color: rgb(28, 168, 175);
    &:hover {
      filter: brightness(105%);
      cursor: pointer;
    }
  }
`;
const Withdrawal = styled.button`
  width: 150px;
  height: 60px;
  margin-left: 400px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(256, 0, 0);
  border: 0px solid rgb(222, 222, 222);
  border-radius: 10px;
  cursor: pointer;
`;
function Mypage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [point, setPoint] = useState("");

  const EmailChange = (e) => {
    setEmail(e.target.value);
  };
  const NicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const PointChange = (e) => {
    setPoint(e.target.value);
  };
  const getUserData = async () => {
    // Define the URL to which the POST request will be sent
    const url = "http://localhost:4000/profile/get";

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
        if (response.data.loginState) {
          setEmail(response.data.email);
          setNickname(response.data.nickname);
          setPoint(response.data.point);
        } else {
          alert("로그인을 하셔야 합니다.");
          window.location.href = "/";
        }
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  const [notice, setNotice] = useState("");
  const [isnicknameabled, setIsnicknameable] = useState(false);

  const checkNickNameDuplicated = async () => {
    const data = {
      Nickname: nickname,
    };
    axios
      .post("http://localhost:4000/join/nn", data)
      .then((response) => {
        const isDuplicated = response.data.isDuplicated;
        if (isDuplicated) {
          setNotice("중복 된 닉네임입니다.");
          setIsnicknameable(false);
        } else {
          setNotice("사용 가능한 닉네임입니다.");
          setIsnicknameable(true);
        }
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Request failed, handle the error
        console.error("Error:", error);
      });
  };

  const setUserData = async () => {
    if (isnicknameabled) {
      const url = "http://localhost:4000/profile/set";

      const data = {
        token: Cookie.get("token"),
        email: email,
        nickname: nickname,
      };

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((response) => {
          if (response.data.sendResult) {
            alert("정보 수정 성공!");
          } else {
            alert("정보 수정 실패!");
          }
        });
    }
  };
  const withdrawal = async () => {
    const url = "http://localhost:4000/withdrawal";

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
        if (response.data.sendResult) {
          alert("탈퇴 성공!");
          Cookie.remove("token");
          window.location.href = "/";
        } else {
          alert("탈퇴 실패!");
        }
      });
  };

  return (
    <Frame>
      <ButtonBox>
        <Button>회원 정보 변경</Button>
        <Button>내가 쓴 글</Button>
        <Button>내가 쓴 댓글</Button>
        <Button>좋아요 한 글</Button>
        <Button>좋아요 한 댓글</Button>
        <Button>스크랩 한 글</Button>
        <Button>차단한 사용자</Button>
      </ButtonBox>
      <div></div>
      <Content>
        <Title>회원 정보 변경</Title>
        <ProfileImg
          alt="프로필사진"
          src="Img\profileimg.jpg"
          style={{ marginBottom: "10px" }}
        />
        <div style={{ marginBottom: "10px" }}>포인트: {point}</div>
        <InputBox>
          <Input
            type="text"
            name="e-mail"
            value={email}
            onChange={EmailChange}
            disabled={true}
          />
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={NicknameChange}
            onBlur={checkNickNameDuplicated}
          />
          <h3 style={{ color: isnicknameabled ? "green" : "red" }}>{notice}</h3>
          <FixButton
            className={isnicknameabled ? "special" : ""}
            onClick={setUserData}
          >
            정보 수정
          </FixButton>
          <Withdrawal onClick={withdrawal}>☠️회원 탈퇴☠️</Withdrawal>
        </InputBox>
      </Content>
    </Frame>
  );
}

export default Mypage;

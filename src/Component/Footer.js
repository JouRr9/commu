import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  align-items: center;
  justify-content: center;
`;
const DarkMode = styled.div`
  background-color: rgb(40, 40, 40);
  color: white;
  border-radius: 10px;
  div {
    margin: 5px;
  }
`;
const A = styled.a`
  text-decoration: none;
  color: inherit;
`;

function Footer1() {
  return (
    <Footer>
      <DarkMode>
        <div>다크모드</div>
      </DarkMode>
      <div>서비스 이용약관 | 개인정보 보호정책 | 청소년 보호정책</div>
      <div>
        Copyright <b>©하하하</b> All rights reserved.
      </div>
    </Footer>
  );
}

export default Footer1;

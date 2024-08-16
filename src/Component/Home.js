import styled from "styled-components";
import Container from "./Container";

const Page = styled.div`
  display: flex;
  justify-content: center;
`;
const Ad = styled.div`
  position: sticky;
  top: 20px;
  bottom: 20px;
  width: max-content;
  height: 400px;
  margin: 20px;
`;

function Home() {
  return (
    <Page>
      <Ad>
        <img alt="Advertising" src="Img\seroAd.png" />
      </Ad>
      <Container />
      <Ad>
        <img alt="Advertising" src="Img\seroAd.png" />
      </Ad>
    </Page>
  );
}
export default Home;

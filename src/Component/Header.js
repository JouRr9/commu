import styled from "styled-components";
import { Link } from "react-router-dom";

//A -> Slink 공사해야함

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  align-items: center;
`;

const HeaderBox = styled.div`
  display: flex;
  width: 1200px;
  height: max-content;
  flex-direction: column;
`;
const Logotab = styled.div`
  display: flex;
  width: 1200px;
  height: 100px;
  justify-content: space-between;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100px;
  margin-left: 450px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 100px;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 50px;
  border: 3px solid rgb(28, 168, 175);
  border-radius: 20px;
`;
const SearchInput = styled.div`
  width: 210px;
  margin-left: 10px;
  border: 3px solid rgb(28, 168, 175);
`;
const SearchButton = styled.div`
  width: 70px;
  margin-right: 10px;
  border: 3px solid rgb(28, 168, 175);
`;
const Menutab = styled.div`
  display: flex;
  width: 1200px;
  height: max-content;
  flex-direction: column;
`;
const Menu = styled.div`
  display: flex;
  width: 1200px;
  height: 50px;
  background-color: rgb(28, 168, 175);
  color: white;
  justify-content: space-between;
`;
const Category = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownMenu = styled.div`
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  background-color: white;
  border: 4px solid rgb(28, 168, 175);
  color: black;
  display: none;
`;
const InCategory = styled.div`
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
  font-weight: 400;
  &.special-div {
    font-weight: 800;
  }
`;
const CategoryButton = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  color: white;
  font-size: 18px;
  font-weight: 800;
  &.special-div {
    background-color: rgb(11, 76, 95);
    color: rgb(247, 254, 46);
  }
  &:hover ${DropdownMenu} {
    display: inline-flex;
  }
`;
const Report = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const Bookmark = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  height: 40px;
  align-items: center;
  background-color: rgb(242, 242, 242);
`;
const BookmarkTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
`;
const BookmarkButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: 30px;
  border-radius: 20px;
  background-color: rgb(230, 230, 230);
  div {
    margin: 10px;
  }
`;
const Slink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const A = styled.a`
  text-decoration: none;
  color: inherit;
`;
const HR = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(217, 217, 217);
`;

function Header1() {
  return (
    <Header>
      <HeaderBox>
        <Logotab>
          <Logo>
            <A href="/">
              <img alt="ChimhahaLogo" src="Img\chimlogo.png" width="200px" />
            </A>
          </Logo>
          <Search>
            <SearchBox>
              <SearchInput>인풋</SearchInput>
              <SearchButton>버튼</SearchButton>
            </SearchBox>
          </Search>
        </Logotab>
        <Menutab>
          <Menu>
            <Category>
              <CategoryButton className="special-div">
                <A href="https://chimhaha.net/best">침하하</A>
                <DropdownMenu>
                  <InCategory className="special-div">
                    <A href="https://chimhaha.net/best">침하하</A>
                  </InCategory>
                  <InCategory className="special-div">
                    <A href="https://chimhaha.net/humor">
                      알렉산드리아 짤 도서관
                    </A>
                  </InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="/new">전체글</A>
                <DropdownMenu>
                  <InCategory>전체 게시판 목록</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/new/chim">침착맨</A>
                <DropdownMenu>
                  <InCategory>방송일정 및 공지</InCategory>
                  <InCategory>침착맨</InCategory>
                  <InCategory>침착맨 짤</InCategory>
                  <InCategory>침착맨 팬아트</InCategory>
                  <InCategory>방송 해줘요</InCategory>
                  <InCategory>침투부 찾아요</InCategory>
                  <InCategory>쇼츠 만들어줘요</InCategory>
                  <InCategory>재밌게 본 침투부</InCategory>
                  <InCategory>침착맨 갤러리</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/new/humor">웃음</A>
                <DropdownMenu>
                  <InCategory className="special-div">
                    알렉산드리아 짤 도서관
                  </InCategory>
                  <HR></HR>
                  <InCategory>짤</InCategory>
                  <InCategory>유머</InCategory>
                  <InCategory>이야기&썰</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/new/sports">운동</A>
                <DropdownMenu>
                  <InCategory>축구</InCategory>
                  <InCategory>야구</InCategory>
                  <InCategory>기타스포츠</InCategory>
                  <InCategory>운동&다이어트</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/new/hobby">취미</A>
                <DropdownMenu>
                  <InCategory>음식&여행</InCategory>
                  <InCategory>반려동물</InCategory>
                  <InCategory>리그 오브 레전드</InCategory>
                  <InCategory>게임</InCategory>
                  <InCategory>영화&드라마</InCategory>
                  <InCategory>음악</InCategory>
                  <InCategory>패션</InCategory>
                  <InCategory>인터넷방송</InCategory>
                  <InCategory>아이돌</InCategory>
                  <InCategory>기타취미</InCategory>
                  <HR></HR>
                  <InCategory>익명</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/check">소원의 돌</A>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/recommend_goods">구쭈</A>
                <DropdownMenu>
                  <InCategory>구쭈</InCategory>
                  <InCategory>구쭈 후기</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton>
                <A href="https://chimhaha.net/wantnotice">행정실</A>
                <DropdownMenu>
                  <InCategory>게시판 요청</InCategory>
                </DropdownMenu>
              </CategoryButton>
              <CategoryButton className="special-div">
                <A href="/minesweeper">지뢰찾기</A>
              </CategoryButton>
            </Category>
            <Report>
              <A href="https://youtu.be/UMTzs53C1wQ">신고/건의</A>
            </Report>
          </Menu>
          <Bookmark>
            <BookmarkTag>
              <b>즐겨찾기</b>
            </BookmarkTag>
            <BookmarkButton>
              <div>전체글</div>
            </BookmarkButton>
          </Bookmark>
          <HR></HR>
          <Bookmark>
            <BookmarkTag>
              <b>최근방문</b>
            </BookmarkTag>
          </Bookmark>
        </Menutab>
      </HeaderBox>
    </Header>
  );
}

export default Header1;

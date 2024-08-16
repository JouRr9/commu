import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { notices, boards } from "../Data/Boards.js";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Boardlist = styled.div`
  display: flex;
  flex-direction: column;
  width: 1180px;
  height: max-content;
  span {
    font-size: 30px;
    font-weight: bold;
    margin: 15px 0px;
  }
`;
const Notice = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(242, 242, 242);
  border-bottom: 1px solid rgb(230, 230, 230);
`;
const NoticeTitle = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;
const NoticeSub = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  margin-right: 10px;
`;
const NoticeTag = styled.div`
  display: flex;
  width: max-content;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid rgb(206, 206, 206);
  background-color: rgb(230, 230, 230);
  font-weight: 400;
  &.special {
    border: 1px solid rgb(195, 195, 195);
    background-color: rgb(217, 217, 217);
    font-weight: 800;
  }
`;
const Post = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(242, 242, 242);
`;
const PostImg = styled.div`
  width: 80px;
  height: 60px;
`;
const PostMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PostTitle = styled.div`
  display: flex;
  align-items: center;
`;
const PostSub = styled.div`
  margin: 10px;
`;
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  div {
    margin: 10px;
    font-size: 15px;
  }
`;
const PageButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 5px;
  color: black;
  font-size: 15px;
  background-color: rgb(242, 242, 242);
  border: hidden;
  border-radius: 5px;
  cursor: pointer;
  &.special {
    color: white;
    background-color: rgb(28, 168, 175);
    cursor: default;
  }
  &.next {
    width: max-content;
    height: 20px;
    background-color: white;
  }
  &.hidden {
    visibility: hidden;
    cursor: default;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;
const SearchTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  border-radius: 15px;
  background-color: rgb(238, 238, 238);
`;
const SearchInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  border-radius: 15px;
  background-color: rgb(238, 238, 238);
  margin: 20px;
`;
const SearchButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border-radius: 15px;
  background-color: rgb(238, 238, 238);
`;
const Writing = styled.div`
  display: flex;
  position: absolute;
  margin-left: 1100px;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border-radius: 15px;
  background-color: rgb(238, 238, 238);
`;
const Slink = styled(Link)`
  text-decoration: none;
  color: rgb(150, 150, 150);
`;

function Test(props) {
  const pageNumber = props.pageNumber;

  const [paginationNumber, setPaginationNum] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setPaginationNum(Math.ceil(pageNumber / 5));
  }, [pageNumber]);

  const handlePageButtonClick = (pageNumber) => {
    navigate(`/new?page=${pageNumber}`);
    // 다른 페이지 관련 로직 실행
  };
  const handleNextButtonClick = (paginationNumber) => {
    setPaginationNum(paginationNumber);
    navigate(`/new?page=${(paginationNumber - 1) * 5 + 1}`);
    // 다른 페이지 관련 로직 실행
  };
  const handlePrevButtonClick = (paginationNumber) => {
    setPaginationNum(paginationNumber);
    navigate(`/new?page=${(paginationNumber - 1) * 5 + 5}`);
    // 다른 페이지 관련 로직 실행
  };

  const totalPages = Math.ceil(boards.length / 20); // 페이지 당 5개의 글을 가정
  const pageButtons = [];

  for (
    let i = 1 + (paginationNumber - 1) * 5;
    i <= 5 + (paginationNumber - 1) * 5;
    i++
  ) {
    if (i <= totalPages) {
      pageButtons.push(
        <PageButton
          className={Number(pageNumber) === i ? "special" : ""}
          onClick={() => handlePageButtonClick(i)}
        >
          {i}
        </PageButton>
      );
    }
  }
  return (
    <Box>
      <Boardlist>
        <span>게시판 이름 (즐찾버튼 구현) {pageNumber}페이지 </span>
        {notices.map((notice) => {
          return (
            <div key={notice.num}>
              <Notice>
                <NoticeTitle>
                  <NoticeTag className="special">필독</NoticeTag>
                  <NoticeTag>공지</NoticeTag>
                  <div style={{ margin: "10px", fontSize: "20px" }}>
                    {notice.title}
                  </div>
                </NoticeTitle>
                <NoticeSub>
                  {notice.nickname}
                  <img alt="YTicon" src="Img\check.png" width={"25px"} />
                  &nbsp;•&nbsp;{notice.day}&nbsp;•&nbsp;👁️‍🗨️{notice.views}
                  &nbsp;•&nbsp;👍{notice.likes}
                </NoticeSub>
              </Notice>
            </div>
          );
        })}

        {boards
          .slice((pageNumber - 1) * 20, (pageNumber - 1) * 20 + 20)
          .map((board) => {
            return (
              <div key={board.num}>
                <Post>
                  <PostImg>사진</PostImg>
                  <PostMain>
                    <PostTitle>
                      <NoticeTag>{board.tag}</NoticeTag>
                      &nbsp;<Slink to={"/" + board.num}>{board.title}</Slink>
                    </PostTitle>
                    <PostSub>
                      {board.nickname}
                      &nbsp;•&nbsp;{board.day}&nbsp;•&nbsp;👁️‍🗨️{board.views}
                      &nbsp;•&nbsp;👍{board.likes}
                    </PostSub>
                  </PostMain>
                </Post>
              </div>
            );
          })}
      </Boardlist>
      <Pagination>
        <PageButton
          className={paginationNumber === 1 ? "hidden" : "next"}
          onClick={() => handlePrevButtonClick(paginationNumber - 1)}
        >
          이전
        </PageButton>
        {/* <PageButton
          className={page === 1 + (paginationNum - 1) * 5 ? "special" : ""}
          onClick={() => handlePageButtonClick(1 + (paginationNum - 1) * 5)}
        >
          {1 + (paginationNum - 1) * 5}
        </PageButton>
        <PageButton
          className={page === 2 + (paginationNum - 1) * 5 ? "special" : ""}
          onClick={() => handlePageButtonClick(2 + (paginationNum - 1) * 5)}
        >
          {2 + (paginationNum - 1) * 5}
        </PageButton>
        <PageButton
          className={page === 3 + (paginationNum - 1) * 5 ? "special" : ""}
          onClick={() => handlePageButtonClick(3 + (paginationNum - 1) * 5)}
        >
          {3 + (paginationNum - 1) * 5}
        </PageButton>
        <PageButton
          className={page === 4 + (paginationNum - 1) * 5 ? "special" : ""}
          onClick={() => handlePageButtonClick(4 + (paginationNum - 1) * 5)}
        >
          {4 + (paginationNum - 1) * 5}
        </PageButton>
        <PageButton
          className={page === 5 + (paginationNum - 1) * 5 ? "special" : ""}
          onClick={() => handlePageButtonClick(5 + (paginationNum - 1) * 5)}
        >
          {5 + (paginationNum - 1) * 5}
        </PageButton> */}

        {pageButtons}

        <PageButton
          className={
            Math.ceil(boards.length / 100) <= paginationNumber
              ? "hidden"
              : "next"
          }
          onClick={() => handleNextButtonClick(paginationNumber + 1)}
        >
          다음
        </PageButton>
      </Pagination>
      <Search>
        <SearchTag>제목 + 내용</SearchTag>
        <SearchInput>{paginationNumber}</SearchInput>
        <SearchButton>검색</SearchButton>
        <Writing>글쓰기</Writing>
      </Search>
    </Box>
  );
}

export default Test;

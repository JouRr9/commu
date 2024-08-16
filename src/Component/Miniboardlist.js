import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { boards } from "../Data/Boards.js";

const BoardListBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1180px;
  height: max-content;
`;
const BoardListTab = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: rgb(242, 242, 242);
  border-bottom: 1px solid rgb(230, 230, 230);
  border-top: 1px solid rgb(230, 230, 230);
  font-weight: bold;
  div {
    display: flex;
    justify-content: center;
    &.title {
      width: 800px;
    }
    &.nickname {
      width: 170px;
    }
    &.date,
    &.view,
    &.like {
      width: 70px;
    }
  }
`;
const BoardList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(230, 230, 230);
  div {
    display: flex;
    align-items: center;
    &.title {
      width: 800px;
    }
    &.nickname {
      justify-content: center;
      width: 170px;
    }
    &.date,
    &.view,
    &.like {
      justify-content: center;
      width: 70px;
    }
  }
  &.selected {
    background-color: rgb(210, 238, 239);
    border-bottom: 1px solid rgb(199, 226, 227);
  }
`;
const BoardTag = styled.div`
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
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
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

function Miniboardlist() {
  const [page, setPage] = useState(1);
  const [paginationNum, setPagepaginationNum] = useState(1);
  const navigate = useNavigate();

  const handlePageButtonClick = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/board?page=${pageNumber}`);
    // 다른 페이지 관련 로직 실행
  };
  const handlePaginationButtonClick = (paginationNumber) => {
    setPagepaginationNum(paginationNumber);
    setPage((paginationNumber - 1) * 5 + 1);
    navigate(`/board?page=${(paginationNumber - 1) * 5 + 1}`);
    // 다른 페이지 관련 로직 실행
  };
  const handlePrevButtonClick = (paginationNumber) => {
    setPagepaginationNum(paginationNumber);
    setPage((paginationNumber - 1) * 5 + 5);
    navigate(`/board?page=${(paginationNumber - 1) * 5 + 1}`);
    // 다른 페이지 관련 로직 실행
  };

  const totalPages = Math.ceil(boards.length / 20); // 페이지 당 5개의 글을 가정
  const pageButtons = [];

  for (
    let i = 1 + (paginationNum - 1) * 5;
    i <= 5 + (paginationNum - 1) * 5;
    i++
  ) {
    if (i <= totalPages) {
      pageButtons.push(
        <PageButton
          key={i}
          className={page === i ? "special" : ""}
          onClick={() => handlePageButtonClick(i)}
        >
          {i}
        </PageButton>
      );
    }
  }

  return (
    <>
      <BoardListBox>
        <h2>게시판 이름</h2>
        <BoardListTab>
          <div className="title">제목</div>
          <div className="nickname">글쓴이이름이열두글자</div>
          <div className="date">날짜</div>
          <div className="view">조회</div>
          <div className="like">추천</div>
        </BoardListTab>
        {boards.slice((page - 1) * 20, page * 20).map((board) => {
          return (
            <div key={board.num}>
              {board.num === 5 ? ( //해당 게시판 번호
                <BoardList className="selected">
                  <div className="title">
                    <BoardTag>{board.tag}</BoardTag>
                    &nbsp;{board.title}
                  </div>
                  <div className="nickname">{board.nickname}</div>
                  <div className="date">{board.day}</div>
                  <div className="view">{board.views}</div>
                  <div className="like">{board.likes}</div>
                </BoardList>
              ) : (
                <BoardList>
                  <div className="title">
                    <BoardTag>{board.tag}</BoardTag>
                    &nbsp;{board.title}
                  </div>
                  <div className="nickname">{board.nickname}</div>
                  <div className="date">{board.day}</div>
                  <div className="view">{board.views}</div>
                  <div className="like">{board.likes}</div>
                </BoardList>
              )}
            </div>
          );
        })}
      </BoardListBox>
      <Pagination>
        <PageButton
          className={paginationNum === 1 ? "hidden" : "next"}
          onClick={() => handlePrevButtonClick(paginationNum - 1)}
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
            Math.ceil(boards.length / 100) === paginationNum ? "hidden" : "next"
          }
          onClick={() => handlePaginationButtonClick(paginationNum + 1)}
        >
          다음
        </PageButton>
      </Pagination>
      <Search>
        <SearchTag>제목 + 내용</SearchTag>
        <SearchInput>{paginationNum}</SearchInput>
        <SearchButton>검색</SearchButton>
        <Writing>글쓰기</Writing>
      </Search>
    </>
  );
}
export default Miniboardlist;

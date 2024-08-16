import styled from "styled-components";
import axios from "axios";
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
const Post = styled.button`
  display: flex;
  width: 100%;
  height: 80px;
  margin-top: 10px;
  border: 0px solid;
  border-bottom: 1px solid rgb(242, 242, 242);
  background-color: white;
  font-size: 15px;
  cursor: pointer;
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
  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;
const Slink = styled(Link)`
  text-decoration: none;
  color: rgb(150, 150, 150);
`;

function BoardList(props) {
  const pageNumber = props.pageNumber;
  const category = props.category;

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
  const handleWriteButtonClick = () => {
    window.location.href = "/write";
  };

  const [datas, setDatas] = useState([]);

  // 게시글 생성 시간과 현재 시간 비교
  datas.forEach((data) => {
    const createdAt = new Date(data.created_at);
    const now = new Date();

    const timeDifferenceInSeconds = Math.floor((now - createdAt) / 1000);
    if (timeDifferenceInSeconds < 60) {
      data.date = timeDifferenceInSeconds + "초 전";
    } else if (timeDifferenceInSeconds < 60 * 60) {
      data.date =
        Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60) + "분 전";
    } else if (timeDifferenceInSeconds < 60 * 60 * 24) {
      data.date =
        Math.floor((timeDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60)) +
        "시간 전";
    } else if (timeDifferenceInSeconds < 60 * 60 * 24 * 7) {
      data.date =
        Math.floor(timeDifferenceInSeconds / (60 * 60 * 24)) + "일 전";
    } else {
      const month = createdAt.getMonth() + 1;
      const dayOfMonth = createdAt.getDate();
      data.date = `${month}.${dayOfMonth}`;
    }
  });
  // 게시글 목록 가져오기
  const getPostList = async () => {
    await axios
      .get("http://localhost:4000/postlist/get")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 코드
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getPostList(); // 페이지가 로드될 때 데이터를 가져옴
  }, []); // 빈 배열을 넘겨서 한 번만 실행되도록 제어

  const totalPages = Math.ceil(datas.length / 20); // 페이지 당 5개의 글을 가정
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

        {datas
          .slice((pageNumber - 1) * 20, (pageNumber - 1) * 20 + 20)
          .sort((a, b) => b.id - a.id)
          .map((data) => {
            return (
              <div key={data.id}>
                <Post onClick={() => (window.location.href = "/" + data.id)}>
                  <PostImg>사진</PostImg>
                  <PostMain>
                    <PostTitle>
                      <NoticeTag>{data.tag}</NoticeTag>
                      &nbsp;
                      <Slink to={"/" + data.id}>
                        {data.title}&nbsp;
                        {data.comments !== 0 && (
                          <span
                            style={{
                              color: "rgb(28, 168, 175)",
                              fontSize: "16px",
                            }}
                          >
                            {data.comments}
                          </span>
                        )}
                      </Slink>
                    </PostTitle>
                    <PostSub>
                      {data.nickname}
                      &nbsp;•&nbsp;{data.date}&nbsp;•&nbsp;👁️‍🗨️
                      {data.views}
                      &nbsp;•&nbsp;👍{data.likes}
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
            Math.ceil(datas.length / 100) <= paginationNumber
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
        <Writing onClick={handleWriteButtonClick}>글쓰기</Writing>
      </Search>
    </Box>
  );
}

export default BoardList;

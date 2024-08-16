import styled from "styled-components";
import Cookie from "js-cookie";
import Miniboardlist from "./Miniboardlist.js";
import { boards } from "../Data/Boards.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//침하하 누르면 침하하 오르게하기
//게시판 목록 게시판에 맞게 파란줄

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Ad = styled.div`
  width: 1200px;
  height: max-content;
`;
const Ad2 = styled.div`
  width: 1150px;
  height: max-content;
`;
const BoardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1150px;
  height: max-content;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid rgb(230, 230, 230);
  div {
    margin: 5px 0px;
  }
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100px;

  border: 1px solid black;
`;
const ButtonTab = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: max-content;
  &.aa {
    justify-content: space-between;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  width: 100px;
  height: 70px;
  border-radius: 10px;
  margin: 10px 3px;
  font-size: 15px;
  &:hover {
    filter: brightness(0.9);
  }
`;
const SmallButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  width: 80px;
  height: 50px;
  border-radius: 10px;
  margin: 10px 3px;
  font-size: 15px;
  &:hover {
    filter: brightness(0.9);
  }
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`;
const Comment = styled.div`
  display: flex;
  height: 80px;
  border-bottom: 1px solid rgb(230, 230, 230);
  &.best {
    border-bottom: 1px solid rgb(199, 226, 227);
    background-color: rgb(210, 238, 239);
  }
`;
const CommentIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid black;
`;
const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Commentuser = styled.div`
  margin: 8px 0px;
`;
const CommentMenu = styled.div`
  //여긴 버튼
  margin: 8px 0px;
`;

const RealComment = styled.div`
  margin: 8px 0px;
`;

const WritingComment = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  margin: 15px 0px;
  border-radius: 15px;
  background-color: rgb(242, 242, 242);
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 10px;
`;
const ImaticonBox = styled.div`
  display: flex;
  margin: 0px 10px;
`;
const Imaticon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: rgb(222, 222, 222);
  margin: 10px 3px;
  font-size: 20px;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  font-size: 20px;
  border: 0px solid rgb(218, 218, 218);
  background-color: rgb(242, 242, 242);
  word-break: break-all;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 80px;
  font-size: 15px;
  border: 0px solid rgb(218, 218, 218);
  background-color: rgb(242, 242, 242);
  word-break: break-all;
  &:focus {
    outline: none;
  }
`;

function Board() {
  const { boardNumber } = useParams();
  const [commentContent, setCommentContent] = useState("");
  const [data, setData] = useState([
    {
      category: null,
      comments: null,
      content: null,
      created_at: null,
      id: null,
      likes: null,
      nickname: null,
      profileimage: null,
      tag: null,
      title: null,
      views: null,
    },
  ]);
  const [date, setDate] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };
  const handleLeaveComment = (event) => {
    submitComment();
  };

  // 게시글 생성 시간과 현재 시간 비교
  const setTimeDifference = () => {
    const createdAt = new Date(data[0].created_at);
    const now = new Date();

    const timeDifferenceInSeconds = Math.floor((now - createdAt) / 1000);
    if (timeDifferenceInSeconds < 60) {
      setDate(timeDifferenceInSeconds + "초 전");
    } else if (timeDifferenceInSeconds < 60 * 60) {
      setDate(Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60) + "분 전");
    } else if (timeDifferenceInSeconds < 60 * 60 * 24) {
      setDate(
        Math.floor((timeDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60)) +
          "시간 전"
      );
    } else if (timeDifferenceInSeconds < 60 * 60 * 24 * 7) {
      setDate(Math.floor(timeDifferenceInSeconds / (60 * 60 * 24)) + "일 전");
    } else {
      const month = (createdAt.getMonth() + 1).toString().padStart(2, "0");
      const dayOfMonth = createdAt.getDate().toString().padStart(2, "0");
      setDate(`${month}.${dayOfMonth}`);
    }
    console.log(date);
  };
  // 댓글 생성 시간과 ...
  comments.forEach((data) => {
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
  // 게시글 가져오기
  const getPost = async () => {
    const data = {
      id: boardNumber,
    };
    axios
      .post("http://localhost:4000/post/get", data)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // 개추
  const plusLike = async () => {
    const data = {
      id: boardNumber,
    };
    axios
      .post("http://localhost:4000/post/like", data)
      .then((response) => {
        alert("개추");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // 댓글 가져오기
  const getComments = async () => {
    const data = {
      id: boardNumber,
    };
    axios
      .post("http://localhost:4000/comment/get", data)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 코드
        console.error("Error:", error);
      });
  };
  // 댓글 작성하기
  const submitComment = async () => {
    if (!Cookie.get("token")) {
      alert("로그인 해주세요");
    } else if (commentContent.length == 0) {
      alert("내용을 작성해주세요");
    } else {
      const url = "http://localhost:4000/comment/submit";

      const data = {
        token: Cookie.get("token"),
        post_id: boardNumber,
        content: commentContent,
      };

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((response) => {
          alert("댓글 등록 성공!");
        });
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []); // 빈 배열을 넘겨서 한 번만 실행되도록 제어

  useEffect(() => {
    setTimeDifference(); // 페이지가 로드될 때 데이터를 가져옴
  }, [data[0].created_at]);

  console.log(comments);
  return (
    <Page>
      <Ad>
        <img alt="Advertising" src="Img\ad.jpg" />
      </Ad>
      <BoardBox>
        <Title>
          <div style={{ fontSize: "20px" }}>
            {data[0].category}&nbsp;{">"}
          </div>
          <div style={{ fontSize: "30px" }}>
            {"["}
            {data[0].tag}
            {"]"}&nbsp;{data[0].title}
          </div>
          <div style={{ fontSize: "20px" }}>
            {data[0].nickname}&nbsp;•&nbsp;
            {date}&nbsp;•&nbsp; 👁️‍🗨️
            {data[0].views}
            &nbsp;•&nbsp; 👍
            {data[0].likes}
          </div>
        </Title>
        <Body>
          <div dangerouslySetInnerHTML={{ __html: data[0].content }} />
        </Body>
        <Ad2>
          <img alt="Advertising" src="Img\ad.jpg" width={"1150px"} />
        </Ad2>
        <ButtonTab>
          <Button onClick={plusLike}>
            <>침하하</>
            <>😂</>
          </Button>
          <Button>스크랩</Button>
        </ButtonTab>
        <ButtonTab className="aa">
          <SmallButton>이전 글</SmallButton>
          <SmallButton>목록</SmallButton>
          <SmallButton>다음 글</SmallButton>
        </ButtonTab>
        <CommentBox>
          <h2>댓글</h2>
          <Comment className="best">
            <CommentIcon>프사</CommentIcon>
            <CommentContent>
              <CommentTop>
                <Commentuser>닉네임, 시간, 따봉 수</Commentuser>
                <CommentMenu>댓글로 이동, 따봉, 더보기(기능구현)</CommentMenu>
              </CommentTop>
              <RealComment>댓글 내용</RealComment>
            </CommentContent>
          </Comment>

          {comments.map((data) => {
            return (
              <div key={data.id}>
                <Comment>
                  <CommentIcon>{data.id}</CommentIcon>
                  <CommentContent>
                    <CommentTop>
                      <Commentuser>
                        {data.nickname}, {data.date}, {data.likes}
                      </Commentuser>
                      <CommentMenu>
                        댓글로 이동, 따봉, 더보기(기능구현)
                      </CommentMenu>
                    </CommentTop>
                    <RealComment>{data.content}</RealComment>
                  </CommentContent>
                </Comment>
              </div>
            );
          })}
          {/* <CommentIcon>프사</CommentIcon>
            <CommentContent>
              <CommentTop>
                <Commentuser>닉네임, 시간, 따봉 수</Commentuser>
                <CommentMenu>댓글로 이동, 따봉, 더보기(기능구현)</CommentMenu>
              </CommentTop>
              <RealComment>댓글 내용</RealComment>
            </CommentContent> */}

          <WritingComment>
            <InputBox>
              <Textarea
                placeholder="댓글을 작성해주세요"
                value={commentContent}
                onChange={handleCommentChange}
              ></Textarea>
              <Button
                onClick={handleLeaveComment}
                style={{ backgroundColor: "rgb(222,222,222)" }}
              >
                등록
              </Button>
            </InputBox>
            <ImaticonBox>
              <Imaticon>📷</Imaticon>
              <Imaticon>🙋‍♀️</Imaticon>
            </ImaticonBox>
          </WritingComment>
        </CommentBox>
        <Button style={{ width: "80px", height: "50px" }}>목록</Button>
      </BoardBox>
      <Miniboardlist />
    </Page>
  );
}
export default Board;

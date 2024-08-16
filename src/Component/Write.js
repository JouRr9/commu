import React from "react";
import Select from "react-select";
import styled from "styled-components";
import Cookie from "js-cookie";
import axios from "axios";
import { CKEditor } from "ckeditor4-react";
import { useState, useEffect } from "react";

const Frame = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin-top: 10px;
`;
const CategoryAndTag = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoardSelect = styled(Select)`
  width: 880px;
`;
const CategorySelect = styled(Select)`
  width: 300px;
`;
const TitleInput = styled.input`
  width: 99%;
  height: 40px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 10px;
  margin: 20px 0px 20px 0px;
  padding-left: 10px;
  font-size: 18px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: max-content;
`;
const Textarea = styled.textarea`
  width: 99%;
  height: 400px;
  font-size: 20px;
  border: 1px solid rgb(200, 200, 200);
  word-break: break-all;
  resize: none;
  padding: 20px 0px 0px 10px;
  &:focus {
    outline: none;
  }
`;
const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: rgb(240, 240, 240);
  border: 0px solid;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: rgb(222, 222, 222);
  }
`;
const editorConfig = {
  width: "1200px",
  height: "600px",
  resize_enabled: false,
  toolbar: [
    { name: "styles", items: ["Font", "FontSize"] },
    {
      name: "insert",
      items: ["Image", "Table", "MediaEmbed", "Link", "HorizontalRule"],
    },
    { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "removeformat", items: ["RemoveFormat"] },
    {
      name: "paragraph",
      items: [
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "NumberedList",
        "BulletedList",
        "Indent",
        "Outdent",
        "Blockquote",
      ],
    },
    { name: "clipboard", items: ["Undo", "Redo"] },
    { name: "source", items: ["Source"] },
  ],
};
function Write() {
  const categorys = [
    { value: "방송일정 및 공지", label: "방송일정 및 공지" },
    { value: "침착맨", label: "침착맨" },
    { value: "침착맨 짤", label: "침착맨 짤" },
  ];
  const tags = [
    { value: "방송일정", label: "방송일정" },
    { value: "공지", label: "공지" },
    { value: "침하하", label: "침하하" },
  ];
  const [text, setText] = useState(""); // 순수문자길이
  const [content, setContent] = useState(""); // html 포함
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };
  const handleTagChange = (selectedOption) => {
    setTag(selectedOption);
  };

  const handleEditorChange = (event) => {
    const data = event.editor.getData();
    setContent(data);
    const parser = new DOMParser();
    const parsedData = parser.parseFromString(data, "text/html");
    const text = parsedData.body.textContent || "";
    setText(text);
  };
  const submitPost = async () => {
    if (title.length == 0) {
      alert("제목을 작성해주세요");
    } else if (content.length == 0) {
      alert("내용을 작성해주세요");
    } else {
      const url = "http://localhost:4000/post/submit";

      const data = {
        token: Cookie.get("token"),
        title: title,
        content: content,
        category: category,
        tag: tag,
      };

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((response) => {
          const insertedId = response.data;
          alert("게시글 등록 성공!");
          window.location.href = `/${insertedId}`;
        });
    }
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
        if (!response.data.loginState) {
          alert("로그인을 하셔야 합니다.");
          window.location.href = "/";
        }
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Frame>
      <WriteBox>
        <h2>글쓰기</h2>
        <CategoryAndTag>
          <BoardSelect
            placeholder="게시판을 선택해 주세요"
            options={categorys}
            value={category}
            onChange={handleCategoryChange}
          />
          <CategorySelect
            placeholder="카테고리를 선택해 주세요"
            options={tags}
            value={tag}
            onChange={handleTagChange}
          />
        </CategoryAndTag>
        <TitleInput
          type="text"
          name="title"
          value={title}
          onChange={TitleChange}
          placeholder="제목"
        />
        <Content>
          <CKEditor
            data="<p>Hello from CKEditor 4!</p>"
            config={editorConfig}
            onChange={handleEditorChange}
          />
          <>{text.length}/10000</>
        </Content>
        <TitleInput type="text" name="tag" placeholder="태그" />
        <Submit onClick={submitPost}>등록</Submit>
      </WriteBox>
    </Frame>
  );
}

export default Write;

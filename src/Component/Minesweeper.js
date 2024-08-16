import { styled } from "styled-components";
import React, { useState, useEffect } from "react";

const Frame = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GameFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  height: max-content;
  border-top: 5px solid white;
  border-left: 5px solid white;
  border-bottom: 5px solid rgb(150, 150, 150);
  border-right: 5px solid rgb(150, 150, 150);
  background-color: rgb(222, 222, 222);
`;
const Navibar = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 96%;
  height: 50px;
  margin: 10px;
  border-top: 5px solid rgb(150, 150, 150);
  border-left: 5px solid rgb(150, 150, 150);
  border-bottom: 5px solid white;
  border-right: 5px solid white;
  background-color: rgb(220, 220, 220);
`;
const PlayGround = styled.div`
  display: flex;
  width: 720px; // max-content
  height: max-content; // max-content
  margin: 10px;
  border-top: 5px solid rgb(150, 150, 150);
  border-left: 5px solid rgb(150, 150, 150);
  border-bottom: 5px solid white;
  border-right: 5px solid white;
  background-color: rgb(220, 220, 220);
  flex-wrap: wrap;
`;
const NumberView = styled.div`
  display: flex;
`;
const MineButton = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  border-top: 4px solid white;
  border-left: 4px solid white;
  border-bottom: 4px solid rgb(150, 150, 150);
  border-right: 4px solid rgb(150, 150, 150);
  background-color: rgb(222, 222, 222);
  &:active {
    border-top: 1px solid rgb(150, 150, 150);
    border-left: 1px solid rgb(150, 150, 150);
    border-bottom: 0px solid rgb(150, 150, 150);
    border-right: 0px solid rgb(150, 150, 150);
  }
`;

function Minesweeper() {
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(16);

  const RowsChange = (e) => {
    setRows(e.target.value);
  };
  const ColsChange = (e) => {
    setCols(e.target.value);
  };

  const setMine = [];
  const [mineButtons, setMineButtons] = useState([]);

  const setGame = () => {
    setMine.length = 0;
    mineButtons.length = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const randomValue = Math.floor(Math.random() * 2);
        row.push(randomValue);
      }
      setMine.push(row);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (setMine[i][j] == 1) {
          mineButtons.push(<MineButton />);
        } else {
          mineButtons.push(<MineButton>@</MineButton>);
        }
      }
    }

    console.log(mineButtons);
  };
  useEffect(() => {
    setMineButtons(mineButtons);
  }, [mineButtons]);
  return (
    <Frame>
      <GameFrame>
        <Navibar>
          <NumberView>남은 지뢰 수</NumberView>
          <NumberView>
            <MineButton onClick={setGame}>@</MineButton>
          </NumberView>
          <NumberView>나나나나시간</NumberView>
        </Navibar>
        <PlayGround>{mineButtons}</PlayGround>
      </GameFrame>
    </Frame>
  );
}

export default Minesweeper;

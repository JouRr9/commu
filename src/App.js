import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Board from "./Component/Board";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import New from "./Component/New";
import Join from "./Component/Join";
import Mypage from "./Component/Mypage";
import Write from "./Component/Write";
import Navigationbar from "./Component/Navigationbar";
import Minesweeper from "./Component/Minesweeper";

function App() {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path="new" element={<New />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path=":boardNumber" element={<Board />} />
        <Route path="write" element={<Write />} />
        <Route path="minesweeper" element={<Minesweeper />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

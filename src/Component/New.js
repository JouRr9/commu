import Boardlist from "./Boardlist";
import { useLocation } from "react-router-dom";

function New1() {
  let defaultPage = 1;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = searchParams.get("page") || defaultPage.toString();

  return (
    <>
      <Boardlist pageNumber={pageNumber} category={"new"} />
    </>
  );
}
export default New1;

// 여기서 게시판 이름까지 전달?

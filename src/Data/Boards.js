export const notices = [
  {
    num: 1,
    tag: 1,
    title: "[공지] [샌드박스] 정식 발매 침착맨 장패드 3종 출시 안내",
    nickname: "강매니저",
    check: true,
    day: "1일전",
    views: 4328,
    likes: 109,
  },
  {
    num: 2,
    tag: 2,
    title: "[방송일정] 7/10 월 ~ 7/16 일 방송일정 안내",
    nickname: "침착맨",
    check: true,
    day: "1일전",
    views: 36993,
    likes: 555,
  },
  {
    num: 3,
    tag: 3,
    title: "[공지] 7/3 침하하 업데이트",
    nickname: "침하하운영팀",
    check: true,
    day: "1일전",
    views: 31438,
    likes: 168,
  },
];
export const boards = [];

for (let i = 1; i <= 15; i++) {
  boards.push({
    num: i,
    tag: i,
    title: `${i}번 게시물`,
    nickname: `작성자${i}`,
    check: true,
    day: `${i}일전`,
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 500),
  });
}

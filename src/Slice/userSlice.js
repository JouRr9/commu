import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
//https://choyeon-dev.tistory.com/entry/Redux-persist-%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8%EC%97%90%EB%8F%84-%EC%9C%A0%EC%A7%80%EB%90%98%EB%8A%94-store-%EB%A7%8C%EB%93%A4%EA%B8%B0-with-Redux-toolkit

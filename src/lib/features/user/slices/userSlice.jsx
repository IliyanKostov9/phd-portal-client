import User from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: new User()
  },
  reducers: {
    setUser: (state, action) => {
      const response = action.payload.response;

      const userObj = {
        oid: response.idTokenClaims.oid,
        name: response.idTokenClaims.name,
        email: response.idTokenClaims.email,
        accessToken: response.accessToken
      };
      state.user = deserialize(User, userObj);
    },
    clearUser(state) {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

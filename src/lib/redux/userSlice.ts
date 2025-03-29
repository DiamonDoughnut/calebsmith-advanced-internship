import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

interface UserStates {
    email: string | null,
    uid: string | null,
    library: string[],
    finished: string[]
}

const initialState: UserStates = {
    email: null,
    uid: null,
    library: [],
    finished: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: Partial<UserStates>, action: PayloadAction<Partial<UserStates>>) => {
        if (action.payload.email) {
          state.email = action.payload.email;
        }
        if (action.payload.uid) {
          state.uid = action.payload.uid;
        }
        if (action.payload.library) {
          state.library = action.payload.library;
        }
        if (action.payload.finished) {
          state.finished = action.payload.finished;
        }
    },
    signOutUser: (state) => {
        state.email = null;
        state.uid = null;
        state.library = [];
        state.finished = []
    }
  }
});

export const { setUser, signOutUser } = userSlice.actions

export const selectUserData = (state: RootState) => state.user

export default userSlice.reducer
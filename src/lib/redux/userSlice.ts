import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { DocumentReference } from 'firebase/firestore';

interface UserStates {
    email: string | null,
    uid: string | null,
    library: string[],
    finished: string[],
    userDocRef: DocumentReference | null,
    isSubscribed: 'premium' | 'premium-plus' | null,
    prefferedText: 'base' | 'lg' | 'xl' | '2xl'
}

const initialState: UserStates = {
    email: null,
    uid: null,
    library: [],
    finished: [],
    userDocRef: null,
    isSubscribed: null,
    prefferedText: 'base'
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
        if (action.payload.userDocRef) {
          state.userDocRef = action.payload.userDocRef;
        }
        if (action.payload.isSubscribed) {
          state.isSubscribed = action.payload.isSubscribed;
        }
        if (action.payload.prefferedText) {
          state.prefferedText = action.payload.prefferedText
        }
    },
    signOutUser: (state) => {
        state.email = null;
        state.uid = null;
        state.library = [];
        state.finished = [];
        state.userDocRef = null;
        state.isSubscribed = null;
        state.prefferedText = 'base'
    }
  }
});

export const { setUser, signOutUser } = userSlice.actions

export const selectUserData = (state: RootState) => state.user

export default userSlice.reducer
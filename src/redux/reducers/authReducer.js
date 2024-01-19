import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Async thunk for observing authentication state
export const observeAuthState = createAsyncThunk(
  "auth/observeAuthState",
  async (_, ThunkApi) => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        ThunkApi.dispatch(setUser(authUser ? { uid: authUser.uid, email: authUser.email } : null))
    });

    // Cleanup function to unsubscribe when needed
    return () => unsubscribe();
  }
);

// Async thunk for user sign-up
export const signUpAsync = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }
);

// Async thunk for user sign-in
export const signInAsync = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  }
);

// Async thunk for user log-out
export const logOutAsync = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: true },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(observeAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(observeAuthState.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authSelector = (state) => state.auth;

export const authReducer =  authSlice.reducer;
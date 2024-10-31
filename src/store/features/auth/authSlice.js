import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = "https://backend-taskify-ecru.vercel.app"

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/users/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/users/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const response = await fetch(`${baseURL}/api/v1/users/current-user`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
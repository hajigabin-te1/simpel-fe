import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api.js";

export const login = createAsyncThunk('/auth/login', async (creds, {rejectWithValue} ) => {
    try {
        const {data} = await api.post('/auth/login',creds);
        localStorage.setItem('token',data.data.token);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login Gagal");
    }
});

export const fetchMe = createAsyncThunk('/auth/fetchMe',  async (_,{ rejectWithValue}) => {
    try {
        const { data } = await api.get('/auth/me');
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
} );

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null,
        token : localStorage.getItem('token') || null,
        loading : false,
        error : null
    },
    reducers : {
        logout(state){
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers : (b) => {
        b
        .addCase(login.pending, (s) => { s.loading = true; s.error = null })
        .addCase(login.fulfilled, (s,a) => {s.loading = false; s.user = a.payload.user; s.token = a.payload.token })
        .addCase(login.rejected, (s,a) => { s.loading = false; s.error = a.payload; } )
        .addCase(fetchMe.fulfilled, (s,a) => {s.user = a.payload; });
    },
});

export const { logout, clearError} = authSlice.actions;
export default authSlice.reducer;
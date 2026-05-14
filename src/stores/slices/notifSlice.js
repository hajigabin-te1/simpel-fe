import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/api.js";

export const fetchNotif = createAsyncThunk('/notif/fetch', async (_,{rejectWithValue}) => {
    try {
        const { data } = await api.get('/notification');
        return data;
    } catch(error){
        return rejectWithValue(error.response?.data?.message);
    }
});

export const readAll = createAsyncThunk('/notif/readall', async () => {
    await api.put('/notification/baca-semua');
} );

const notifSlice = createSlice({
    name : 'notif',
    initialState: { list : [], belum_baca : 0 },
    reducers : {
        addRealtimeNotification(state,action){
            state.list.unshift(action.payload);
            state.belum_baca += 1;
        }
    },
    extraReducers : (x) => {
        x.addCase(fetchNotif.fulfilled, (a,b) => {
            a.list = b.payload.data;
            a.belum_baca = b.payload.belum_baca;
        })
        .addCase(readAll.fulfilled, (s) => {
            s.belum_baca = 0;
            s.list.forEach( (n) => (
                n.telah_baca = true
            ));
        });
    }
});

export const { addRealtimeNotification} = notifSlice.actions;
export default notifSlice.reducer;
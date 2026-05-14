import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api.js";

export const fetchTicket = createAsyncThunk("/ticket/fetchAll", async (params,{rejectWithValue}) => {
    try {
        const { data } = await api.get('/tickets');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const fetchTicketById = createAsyncThunk('/ticket/fetchOne', async(id,{rejectWithValue}) => {
    try {
        const { data } = await api.get('/tickets/:id');
        return data;
    } catch (error) {
        rejectWithValue(error.response?.data?.message);
    }
});

export const createTicket = createAsyncThunk('/ticket/create', async (formData,{ rejectWithValue}) => {
    try {
        const { data } = await api.post('/tickets', formData,{
            headers : { 'Content-Type' : 'multipart/form-data' }
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});


export const updateTicket = createAsyncThunk('ticket/update', async ({id, payload},{rejectWithValue}) => {
    try {
        const { data } = await api.put(`/tickets/${id}/status`,payload);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});

const ticketSlice = createSlice({
    name : 'ticket',
    initialState: {
        list : [],
        detail : null,
        pagination : {},
        loading : false,
        error : null
    },
    reducer : {
        addTicketRealtime(state,action){
            state.list.unshift(action.payload);
        },
        updateTicketRealtime(state,action){
            const idx = state.list.findIndex((t) => t._id === action.payload._id);
            if ( idx !== -1 ) state.list[idx] = action.payload;
            if (state.detail?._id === action.payload._id ) state.detail = action.payload;
        }
    },
    extraReducers : (b) => {
        b
    .addCase(fetchTickets.pending,    (s) => { s.loading = true; })
    .addCase(fetchTickets.fulfilled,  (s, a) => { s.loading = false; s.list = a.payload.data; s.pagination = a.payload.pagination; })
    .addCase(fetchTickets.rejected,   (s, a) => { s.loading = false; s.error = a.payload; })
    .addCase(fetchTicketById.pending,   (s) => { s.loading = true; s.detail = null; })
    .addCase(fetchTicketById.fulfilled, (s, a) => { s.loading = false; s.detail = a.payload; })
    .addCase(createTicket.fulfilled,    (s, a) => { s.list.unshift(a.payload); })
    .addCase(updateStatus.fulfilled,    (s, a) => {
        const idx = s.list.findIndex((t) => t._id === a.payload._id);
        if (idx !== -1) s.list[idx] = a.payload;
        if (s.detail?._id === a.payload._id) s.detail = a.payload;
    });
    }
});

export const { addTicketRealtime, updateTicketRealtime } = ticketSlice.actions;
export default ticketSlice.reducer;
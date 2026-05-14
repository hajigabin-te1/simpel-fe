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
})
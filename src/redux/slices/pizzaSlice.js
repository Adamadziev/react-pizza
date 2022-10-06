import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { categoryId, sort, currentPage, limitPizzasPage, order } = params;
    const { data } = await axios.get(
      `https://62c1dce62af60be89ecefccf.mockapi.io/items?category=${categoryId}&page=${currentPage}&limit=${limitPizzasPage}&sortBy=${sort.sortProperty}&order=${order}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | sucsess | error
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "sucsess";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

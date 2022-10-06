import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      } else {
        state.items.push({ ...action.payload, count: 1 });
        state.totalPrice += action.payload.price;
      }
    },
    incItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      }
    },
    decItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size
      );
      state.totalPrice -= findItem.price * findItem.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Это функция которая принимает id и затем вызывает еще одну ф-цию, которая принимает стейт
export const selectCartItemsById = (id) => (state) =>
  state.cart.items.filter((obj) => obj.id === id);
export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItems, incItem, decItem } =
  cartSlice.actions;

export default cartSlice.reducer;

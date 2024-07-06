import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './cartOperations';
import { RootState } from '../store';

const initialState = {
  filteredCart: [] as CartItem[],
  customerInfo: {} as Info,
  orderSum: 0,
  error: null as any,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: { payload: CartItem }) {
      const existingItemIndex = state.filteredCart.findIndex(
        item => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        state.filteredCart[existingItemIndex].quantity +=
          action.payload.quantity;
        state.filteredCart[existingItemIndex].totalPrice +=
          action.payload.totalPrice;
      } else {
        state.filteredCart = [...state.filteredCart, action.payload];
      }
    },
    deleteItem(state, action: { payload: string }) {
      state.filteredCart = state.filteredCart.filter(
        (item: CartItem) => item._id !== action.payload
      );
    },
    checkCart(state, action: { payload: Product[] }) {
      state.filteredCart = state.filteredCart.filter(({ _id: id1 }) =>
        action.payload.some(({ _id: id2 }) => id1 === id2)
      );
    },
    addInfo(state, action: { payload: Info }) {
      state.customerInfo = action.payload;
    },
    deleteAllItems(state) {
      state.filteredCart = [];
      state.customerInfo = {} as Info;
    },
    addOrderSum(state, action: { payload: number }) {
      state.orderSum = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(sendOrder.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = true;
          state.isLoading = false;
          return;
        }
        if (action.payload === 201) {
          state.isLoading = false;
        }
      })
      .addCase(sendOrder.rejected, (state, action) => {
        console.log('err');
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const cartReducer = cartSlice.reducer;

export const getFilteredCart = (state: RootState) => state.cart.filteredCart;
export const getCustomerInfo = (state: RootState) => state.cart.customerInfo;
export const getOrderSum = (state: RootState) => state.cart.orderSum;
export const getIsLoading = (state: RootState) => state.cart.isLoading;
export const getError = (state: RootState) => state.cart.error;

export const { addItem } = cartSlice.actions;
export const { deleteItem } = cartSlice.actions;
export const { checkCart } = cartSlice.actions;
export const { addInfo } = cartSlice.actions;
export const { deleteAllItems } = cartSlice.actions;
export const { addOrderSum } = cartSlice.actions;

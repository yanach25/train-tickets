/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   date_start: null,
   date_end: null,
   routeFrom: {
      id: '1491',
      city: 'москва',
   },
   routeIn: {
      id: '1492',
      city: 'санкт-петербург',
   },
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      searchFieldChange: (state, action) => {
         const { name, value } = action.payload;
         state[name] = value;
      },
      cityExchange: (state) => {
         const from = state.routeFrom;
         state.routeFrom = state.routeIn;
         state.routeIn = from;
      },
   },
});

export const { searchFieldChange, cityExchange } = searchSlice.actions;
export default searchSlice.reducer;

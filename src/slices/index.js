import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import stageReducer from "./stageSlice";
import filterReducer from './filterSlice';
import seatsReducer from './seatsSlice';
import routesReducer from "./routesSlice";
import passengersReducer from "./passengersSlice";
import payReducer from "./paySlice";
import orderReducer from "./orderSlice";

export default configureStore({
   reducer: {
      search: searchReducer,
      stage: stageReducer,
      filter: filterReducer,
      seats: seatsReducer,
      routes: routesReducer,
      passengers: passengersReducer,
      pay: payReducer,
      order: orderReducer,
   },
});

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { fetchSeats } from '../../../../slices/seatsSlice'
import Ticket from '../Ticket';
import './Seats.css';
import { passengersPriceClear } from "../../../../slices/passengersSlice";

export default function Seats() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { train } = useSelector((state) => state.seats.train);
   const seatsDeparture = useSelector(
      (state) => state.seats.departure.seatsCount
   );
   const seatsArrival = useSelector((state) => state.seats.arrival.seatsCount);
   const { passengersCount } = useSelector((state) => state.passengers);

   useEffect(() => {
      dispatch(passengersPriceClear());
      dispatch(fetchSeats('departure'));
      if (train.arrival) dispatch(fetchSeats('arrival'));
   }, [dispatch]);

   const [disabled, setDisabled] = useState(true);
   const passengersCountAll =
      Number(passengersCount.adult) + Number(passengersCount.child);

   useEffect(() => {
      setDisabled(true);
      if (
         train.arrival &&
         (seatsArrival === 0 || Number(seatsArrival) !== passengersCountAll)
      )
         return;
      if (seatsDeparture === 0 || Number(seatsDeparture) !== passengersCountAll)
         return;
      setDisabled(false);
   }, [passengersCount, seatsArrival, seatsDeparture, passengersCountAll]);

   const handleClick = () => {
      navigate('/order/passengers/');
   };

   return (
      <section className="seats order-options">
         <h3 className="title seats-title">Выбор мест</h3>
         {train.departure && (
            <Ticket type="departure" className="ticket-header__train" />
         )}
         {train.arrival && (
            <Ticket type="arrival" className="ticket-header__train" />
         )}
         <div className="seats-buttons">
            <button
               type="button"
               className="button seats-buttons__item"
               onClick={handleClick}
               disabled={disabled}
            >
               Далее
            </button>
         </div>
      </section>
   );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';

import { stageChange } from '../../../slices/stageSlice';

import passenger from './passenger.svg';
import './Verification.css';
import rub from '../../../assets/img/tickets/tickets-rub.svg';
import { clearStatus, fetchOrder } from '../../../slices/orderSlice';
import PriceFormatter from "../../PriceFormatter";
import Train from "../Tickets/Train";

export default function Verification() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { train } = useSelector((state) => state.seats.train);
   const { passengers, passengersPrice } = useSelector(
      (state) => state.passengers
   );
   const { orderStatus } = useSelector((state) => state.order);

   useEffect(() => {
      dispatch(stageChange({ stage: 4 }));
      dispatch(clearStatus());
   }, []);

   useEffect(() => {
      if (orderStatus === true) navigate('/success');
   }, [orderStatus]);

   const handleClick = (event) => {
      event.preventDefault();
      dispatch(fetchOrder());
      if (orderStatus === true) navigate('/success');
   };

   const handlePassengers = () => {
      navigate('/order/passengers/');
   };

   return (
      <section className="verification order-verification">
         <div className="verification-section">
            <h4 className="title verification-title">Поезд</h4>
            <Train key={nanoid()} train={train} option="verification" />
         </div>

         <div className="verification-section">
            <h4 className="title verification-title">Пассажиры</h4>
            <div className="verification-passenger">
               <div className="verification-passenger-persons">
                  {passengers.map((el) => (
                     <div className="passenger-card" key={nanoid()}>
                        <div className="passenger-card__header">
                           <img src={passenger} alt="passenger" />
                           <h5 className="passenger-card__title">
                              {el.type === 'adult' ? 'Взрослый' : 'Детский'}
                           </h5>
                        </div>
                        <div className="passenger-card__content">
                           <h6 className="passenger-card__content-title">
                              {el.surname.trim()} {el.name.trim()}{' '}
                              {el.lastname.trim()}
                           </h6>
                           <p className="passenger-card__content-text">
                              Пол {el.sex === 'male' ? 'мужской' : 'женский'}
                           </p>
                           <p className="passenger-card__content-text">
                              Дата рождения {el.birth}
                           </p>
                           <p className="passenger-card__content-text">
                              {el.type === 'adult'
                                 ? `Паспорт РФ  ${el.series} ${el.document}`
                                 : `Свидетельство о рождении ${el.document}`}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="verification-price">
                  <div className="verification-price__wrapper">
                     <p className="verification-price__name">Всего</p>
                     <PriceFormatter
                        title="verification-price__sum"
                        value={
                           passengersPrice.departure.child +
                           passengersPrice.departure.adult +
                           passengersPrice.departure.services +
                           passengersPrice.arrival.child +
                           passengersPrice.arrival.adult +
                           passengersPrice.arrival.services
                        }
                     />
                     <img
                        className="verification-currency"
                        src={rub}
                        alt="руб."
                     />
                  </div>
                  <button
                     type="button"
                     className="button verification-button"
                     onClick={handlePassengers}
                  >
                     Изменить
                  </button>
               </div>
            </div>
         </div>

         <div className="verification-buttons">
            <button
               type="button"
               className="button verification-button__next"
               onClick={handleClick}
            >
               Подтвердить
            </button>
         </div>
      </section>
   );
}

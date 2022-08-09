/* eslint-disable radix */

import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import rub from '../../../../assets/img/tickets/tickets-rub.svg';
import './Details.css';
import PriceFormatter from "../../../PriceFormatter";
import { arrivalSvg, departureSvg } from "../../Tickets/svg";

export default function Details() {
   const { train } = useSelector((state) => state.seats.train);
   const { departure, arrival } = train;
   const { passengersCount, passengersPrice } = useSelector(
      (state) => state.passengers
   );
   const [isHidden, setHidden] = useState({
      departure: true,
      arrival: true,
      passengers: true,
   });
   const onHidden = (name) => {
      setHidden((prev) => ({ ...prev, [name]: !prev[name] }));
   };

   const formatSeconds = (value) => {
      const hour = parseInt(value / 3600);
      const min = parseInt((value % 3600) / 60);
      return `${hour} : ${min}`;
   };

   return (
      <section className="details">
         <h3 className="title details-title">Детали поездки</h3>
         <div className="sidebar-inner">
            <div className="sidebar-header title-goThere">
               <h4 className="title title-small sidebar-title">
                  Туда
                  <span className="sidebar-date">
                     {moment.unix(departure.from.datetime).format('DD.MM.YYYY')}
                  </span>
               </h4>
               <button
                  type="button"
                  className={`details-departure details-button ${
                     !isHidden.departure ? 'active-button' : 'inactive-button'
                  }`}
                  onClick={() => onHidden('departure')}
               />
            </div>

            <div
               className={`details-wrapper ${
                  isHidden.departure ? '' : 'hidden'
               } `}
            >
               <div className="details-info">
                  <p className="details-info__title">№ Поезда</p>
                  <p className="details-info__text details-info__text-train">
                     {departure.train.name}
                  </p>
               </div>
               <div className="details-info details-info__city">
                  <p className="details-info__title">Название</p>
                  <p className="details-info__text details-info__text-route">
                     {departure.from.city.name}
                     <br />
                     {departure.to.city.name}
                  </p>
               </div>
               <div className="details-info details-info__route">
                  <div className="route">
                     <div className="route-info">
                        <p className="route-time">
                           {moment
                              .unix(departure.from.datetime)
                              .format('HH:mm')}
                        </p>
                        <p className="route-date">
                           {moment
                              .unix(departure.from.datetime)
                              .format('DD.MM.YYYY')}
                        </p>
                     </div>
                     <div className="route-duration">
                        <p className="route-duration__time">
                           {formatSeconds(departure.duration)}
                        </p>
                        {departureSvg}
                     </div>
                     <div className="route-info route-info__right">
                        <p className="route-time">
                           {moment.unix(departure.to.datetime).format('hh:mm')}
                        </p>
                        <p className="route-date">
                           {moment
                              .unix(departure.to.datetime)
                              .format('DD.MM.YYYY')}
                        </p>
                     </div>
                  </div>
                  <div className="route">
                     <div className="route-info">
                        <p className="route-city">{departure.from.city.name}</p>
                        <p className="route-station">
                           {departure.from.railway_station_name}
                           <br />
                           вокзал
                        </p>
                     </div>
                     <div className="route-info route-info__right">
                        <p className="route-city">{departure.to.city.name}</p>
                        <p className="route-station">
                           {departure.to.railway_station_name}
                           <br />
                           вокзал
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {arrival && (
            <div className={`sidebar-inner ${arrival ? '' : 'hidden'}`}>
               <div className="sidebar-header title-goBack">
                  <h4 className="title title-small sidebar-title">
                     Обратно{' '}
                     <span className="sidebar-date">
                        {moment
                           .unix(arrival.from.datetime)
                           .format('DD.MM.YYYY')}
                     </span>
                  </h4>

                  <button
                     type="button"
                     className={`details_arrival details-button ${
                        !isHidden.arrival ? 'active-button' : 'inactive-button'
                     }`}
                     onClick={() => onHidden('arrival')}
                  />
               </div>

               <div
                  className={`details-wrapper ${
                     isHidden.arrival ? '' : 'hidden'
                  } `}
               >
                  <div className="details-info">
                     <p className="details-info__title">№ Поезда</p>
                     <p className="details-info__text details-info__text-train">
                        {arrival.train.name}
                     </p>
                  </div>
                  <div className="details-info details-info__city">
                     <p className="details-info__title">Название</p>
                     <p className="details-info__text details-info__text-route">
                        {arrival.from.city.name}
                        <br />
                        {arrival.to.city.name}
                     </p>
                  </div>
                  <div className="details-info details-info__route">
                     <div className="route">
                        <div className="route-info">
                           <p className="route-time">
                              {moment
                                 .unix(arrival.from.datetime)
                                 .format('HH:mm')}
                           </p>
                           <p className="route-date">
                              {moment
                                 .unix(arrival.from.datetime)
                                 .format('DD.MM.YYYY')}
                           </p>
                        </div>
                        <div className="route-duration">
                           <p className="route-duration__time">
                              {formatSeconds(arrival.duration)}
                           </p>
                           {arrivalSvg}
                        </div>
                        <div className="route-info route-info__right">
                           <p className="route-time">
                              {moment.unix(arrival.to.datetime).format('hh:mm')}
                           </p>
                           <p className="route-date">
                              {moment
                                 .unix(arrival.to.datetime)
                                 .format('DD.MM.YYYY')}
                           </p>
                        </div>
                     </div>
                     <div className="route">
                        <div className="route-info">
                           <p className="route-city">
                              {arrival.from.city.name}
                           </p>
                           <p className="route-station">
                              {arrival.from.railway_station_name}
                              <br />
                              вокзал
                           </p>
                        </div>
                        <div className="route-info route-info__right">
                           <p className="route-city">{arrival.to.city.name}</p>
                           <p className="route-station">
                              {arrival.to.railway_station_name}
                              <br />
                              вокзал
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         <div className="sidebar-inner">
            <div className="sidebar-header sidebar-header__passengers">
               <h4 className="title title-small title-passengers">
                  Пассажиры
               </h4>
               <button
                  type="button"
                  className={`details-passengers details-button ${
                     !isHidden.passengers ? 'active-button' : 'inactive-button'
                  }`}
                  onClick={() => onHidden('passengers')}
               />
            </div>

            <div className={`${isHidden.passengers ? '' : 'hidden'} `}>
               <ul className="details-passengers__list">
                  <li className="details-passengers__item">
                     <span className="details-passengers__count">
                        {passengersCount.adult} Взрослы
                        {Number(passengersCount.adult) === 1 ? 'й' : 'х'}
                     </span>

                     <PriceFormatter
                        title="details-passengers__price"
                        value={
                           arrival
                              ? passengersPrice.departure.adult +
                                passengersPrice.arrival.adult +
                                passengersPrice.departure.services +
                                passengersPrice.arrival.services
                              : passengersPrice.departure.adult +
                                passengersPrice.departure.services
                        }
                     />
                     <img className="details-currency" src={rub} alt="руб." />
                  </li>
                  {Number(passengersCount.child) +
                     Number(passengersCount.baby) >
                     0 && (
                     <li className="details-passengers__item">
                        <span className="details-passengers__count">
                           {Number(passengersCount.child) +
                              Number(passengersCount.baby)}{' '}
                           Ребен
                           {Number(passengersCount.child) +
                              Number(passengersCount.baby) ===
                           1
                              ? 'ок'
                              : 'ка'}
                        </span>
                        <PriceFormatter
                           title="details-passengers__price"
                           value={
                              passengersPrice.departure.child +
                              passengersPrice.arrival.child
                           }
                        />
                        <img
                           className="details-currency"
                           src={rub}
                           alt="руб."
                        />
                     </li>
                  )}
               </ul>
            </div>
         </div>

         <div className="details-footer">
            <h3 className="title title-small details-footer__title">Итог</h3>
            <PriceFormatter
               title="details-footer__total"
               value={
                  passengersPrice.departure.adult +
                  passengersPrice.arrival.adult +
                  passengersPrice.departure.child +
                  passengersPrice.arrival.child +
                  passengersPrice.departure.services +
                  passengersPrice.arrival.services
               }
            />
            <img className="details-currency__total" src={rub} alt="руб." />
         </div>
      </section>
   );
}

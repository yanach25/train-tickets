import React from 'react';
import moment from 'moment';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { trainAdd } from '../../../../slices/seatsSlice';

import Duration from './Duration';
import './Train.css';

import trainLogo from '../../../../assets/img/tickets/ticket/train-logo.svg';
import trainLogoSmall from '../../../../assets/img/tickets/ticket/train-logo-small.svg';
import clock from '../../../../assets/img/tickets/ticket/train-clock.svg';

import rub from '../../../../assets/img/tickets/tickets-rub.svg';
import {
   defaultRouteSvg,
   routeSvg,
   departureSvg,
   arrivalSvg,
   wifi,
   express,
   food,
} from '../svg';
import PriceFormatter from "../../../PriceFormatter";

export default function Train(route, type) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { train, option } = route;
   const { departure, arrival } = train;

   const handleClick = () => {
      if (option === 'verification') {
         navigate('/order/tickets/train');
         return;
      }

      dispatch(trainAdd(route));
      navigate('/order/tickets/seats');
   };

   return (
      <div className={`train order-train ${option || ''}`}>
         <div className="train-logo">
            <img
               className="train-logo__icon"
               src={
                  option === 'ticket-header__train' ? trainLogoSmall : trainLogo
               }
               alt="Train"
            />
            <div className="train-title">
               <h4 className="train-name">{departure.train.name}</h4>
               {train.default && (
                  <p className="train-title__route train-title__route-default">
                     {train.default}
                     {defaultRouteSvg}
                  </p>
               )}
               <p className="train-title__route">
                  {departure.from.city.name}
                  {routeSvg}
               </p>
               <p className="train-title__route ">{departure.to.city.name}</p>
            </div>
         </div>

         <div className="train-routes">
            {departure && type !== 'arrival' && (
               <div className="route train-routes__item">
                  <div className="route-info train-routes__item-info">
                     <p className="route-time train-routes__item-time">
                        {moment
                           .unix(departure.from.datetime)
                           .utc()
                           .format('HH:mm')}
                     </p>
                     <p className="route-city train-routes__item-city">
                        {departure.from.city.name}
                     </p>
                     <p className="route-station train-routes__item-station">
                        {departure.from.railway_station_name} вокзал
                     </p>
                  </div>
                  <div className="route-duration train-routes__item-duration">
                     {option !== 'ticket-header__train' && (
                        <p className="route-duration-time train-routes__item-duration-time">
                           {moment
                              .unix(departure.duration)
                              .utc()
                              .format('HH:mm')}
                        </p>
                     )}
                     {departureSvg}
                  </div>
                  <div className="route-info train-routes__item-info">
                     <p className="route-time train-routes__item-time">
                        {moment
                           .unix(departure.to.datetime)
                           .utc()
                           .format('HH:mm')}
                     </p>
                     <p className="route-city train-routes__item-city">
                        {departure.to.city.name}
                     </p>
                     <p className="route-station train-routes__item-station">
                        {departure.to.railway_station_name} вокзал
                     </p>
                  </div>
               </div>
            )}
            {arrival && type !== 'departure' && (
               <div className="route train_route train-routes__item-back">
                  <div className="route-info train-routes__item-info">
                     <p className="route-time train-routes__item-time">
                        {moment.unix(arrival.to.datetime).utc().format('HH:mm')}
                     </p>
                     <p className="route-city train-routes__item-city">
                        {arrival.to.city.name}
                     </p>
                     <p className="route-station train-routes__item-station">
                        {arrival.to.railway_station_name} вокзал
                     </p>
                  </div>
                  <div className="route-duration train-routes__item-duration train-routes__item-duration">
                     {option !== 'ticket-header__train' && (
                        <p className="route-duration-time train-routes__item-duration-time">
                           {moment.unix(arrival.duration).utc().format('HH:mm')}
                        </p>
                     )}
                     {arrivalSvg}
                  </div>
                  <div className="route-info train-routes__item-info">
                     <p className="route-time train-routes__item-time">
                        {moment
                           .unix(arrival.from.datetime)
                           .utc()
                           .format('HH:mm')}
                     </p>
                     <p className="route-city train-routes__item-city">
                        {arrival.from.city.name}
                     </p>
                     <p className="route-station train-routes__item-station">
                        {arrival.from.railway_station_name} вокзал
                     </p>
                  </div>
               </div>
            )}
         </div>

         <div className="train-info">
            {option !== 'ticket-header__train' && (
               <>
                  <ul className="train-seats__list">
                     {departure.available_seats_info.fourth && (
                        <li className="train-seats__item">
                           <p className="train-seats__type">Сидячий</p>
                           <p className="train-seats__count">
                              {departure.available_seats_info.fourth}
                           </p>
                           <span className="train-seats__price">
                              от
                              <PriceFormatter
                                 title="train-seats__price"
                                 value={departure.price_info.fourth.top_price}
                              />{' '}
                              <img
                                 className="train-seats__price-currency"
                                 src={rub}
                                 alt="rub"
                              />
                           </span>
                        </li>
                     )}
                     {departure.available_seats_info.third && (
                        <li className="train-seats__item">
                           <p className="train-seats__type">Плацкарт</p>
                           <p className="train-seats__count">
                              {departure.available_seats_info.third}
                           </p>
                           <span className="train-seats__price">
                              от
                              <PriceFormatter
                                 title="train-seats__price"
                                 value={departure.price_info.third.side_price}
                              />
                              <img
                                 className="train-seats__price-currency"
                                 src={rub}
                                 alt="rub"
                              />
                           </span>
                        </li>
                     )}
                     {departure.available_seats_info.second && (
                        <li className="train-seats__item">
                           <p className="train-seats__type">Купе</p>
                           <p className="train-seats__count">
                              {departure.available_seats_info.second}
                           </p>
                           <span className="train-seats__price">
                              от
                              <PriceFormatter
                                 title="train-seats__price"
                                 value={
                                    departure.price_info.second.bottom_price
                                 }
                              />
                              <img
                                 className="train-seats__price-currency"
                                 src={rub}
                                 alt="rub"
                              />
                           </span>
                        </li>
                     )}
                     {departure.available_seats_info.first && (
                        <li className="train-seats__item">
                           <p className="train-seats__type">Люкс</p>
                           <p className="train-seats__count">
                              {departure.available_seats_info.first}
                           </p>
                           <span className="train-seats__price">
                              от
                              <PriceFormatter
                                 title="train-seats__price"
                                 value={departure.price_info.first.top_price}
                              />
                              <img
                                 className="train-seats__price-currency"
                                 src={rub}
                                 alt="rub"
                              />
                           </span>
                        </li>
                     )}
                  </ul>
                  <div className="train-options">
                     {departure.have_wifi && wifi('train-options__icon')}
                     {departure.is_express && express('train-options__icon')}
                     {food('train-options__icon')}
                  </div>
                  <button
                     type="button"
                     className={`button ${
                        option === 'verification'
                           ? 'verification-button'
                           : 'train-seats__button'
                     }`}
                     onClick={handleClick}
                  >
                     {option === 'verification' ? 'Изменить' : 'Выбрать места'}
                  </button>
               </>
            )}
            {option === 'ticket-header__train' && (
               <div className="train-time">
                  <img className="train-icon__clock" src={clock} alt="clock" />
                  <Duration
                     hours={moment.unix(departure.duration).utc().format('H')}
                     minutes={moment.unix(departure.duration).utc().format('m')}
                  />
               </div>
            )}
         </div>
      </div>
   );
}

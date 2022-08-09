import React from 'react';
import PropTypes from 'prop-types';

import rub from '../../../../../assets/img/tickets/tickets-rub.svg';
import express from '../../../../../assets/img/tickets/tickets-express.svg';
import wifi from '../../../../../assets/img/tickets/tickets-wifi.svg';
import conditioning from '../../../../../assets/img/tickets/tickets-conditioning.svg';
import food from '../../../../../assets/img/tickets/tickets-food.svg';
import PriceFormatter from "../../../../PriceFormatter";
import './LastTicket.css';

export default function LastTicket({ ticket }) {
   return (
      <div className="last-ticket">
         <div className="last-ticket__header">
            <div className="last-ticket__title-from">
               <h4 className="last-ticket__title">
                  {ticket.departure.from.city.name}
               </h4>
               <span className="last-ticket__subtitle">
                  {ticket.departure.from.railway_station_name}
                  <br />
                  вокзал
               </span>
            </div>
            <div className="last-ticket__title-to">
               <h4 className="last-ticket__title">
                  {ticket.departure.to.city.name}
               </h4>
               <span className="last-ticket__subtitle">
                  {ticket.departure.to.railway_station_name}
                  <br />
                  вокзал
               </span>
            </div>
         </div>
         <div className="last-ticket__info">
            <div className="last-ticket__options">
               {ticket.departure.have_wifi && (
                  <img
                     className="last-ticket__options-icon"
                     src={wifi}
                     alt="wi-fi"
                  />
               )}
               {ticket.departure.is_express && (
                  <img
                     className="last-ticket__options-icon"
                     src={express}
                     alt="express"
                  />
               )}
               {ticket.departure.have_air_conditioning && (
                  <img
                     className="last-ticket__options-icon"
                     src={conditioning}
                     alt="conditioning"
                  />
               )}

               <img
                  className="last-ticket__options-icon"
                  src={food}
                  alt="food"
               />
            </div>

            <div className="last-ticket__price-range">
               <span className="last-ticket__price">
                  от{' '}
                  <PriceFormatter
                     title="last-ticket__price"
                     value={ticket.departure.min_price}
                  />
                  <img className="last-ticket__currency" src={rub} alt="руб." />
               </span>
            </div>
         </div>
      </div>
   );
}

LastTicket.propTypes = {
   ticket: PropTypes.objectOf(
      PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number,
         PropTypes.bool,
         PropTypes.object,
      ])
   ).isRequired,
};

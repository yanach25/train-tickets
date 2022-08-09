/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routeTo, routeBack, seat, platzcart, kupe, lux } from '../svg';
import {
   coachClassChange,
   coachItemsSelect,
   coachItemsUnSelect,
   coachItemsClear,
} from '../../../../slices/seatsSlice';
import './Ticket.css';
import Train from '../Train';
import Coach from '../Coach';
import { passengersCountChange } from "../../../../slices/passengersSlice";

export default function Ticket({ type }) {
   const { train } = useSelector((state) => state.seats.train);
   const { coachList, coachClass, coachItems } = useSelector(
      (state) => state.seats[type]
   );

   const { passengersCount } = useSelector((state) => state.passengers);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(coachItemsClear({ type }));
   }, []);

   const available = {
      adult: 4 - passengersCount.adult - passengersCount.child,
      child:
         passengersCount.adult === 0
            ? 3
            : 4 - passengersCount.adult - passengersCount.child,
      baby: passengersCount.adult,
   };

   const classes = {
      fourth: {
         available: train[type].have_fourth_class === true,
         icon: seat,
         name: 'Сидячий',
      },
      third: {
         available: train[type].have_third_class === true,
         icon: platzcart,
         name: 'Платцкарт',
      },
      second: {
         available: train[type].have_second_class === true,
         icon: kupe,
         name: 'Купе',
      },
      first: {
         available: train[type].have_first_class === true,
         icon: lux,
         name: 'Люкс',
      },
   };

   const handleChange = (name, value) => {
      if (available[name] + passengersCount[name] < value) return;
      if (name === 'baby' && available[name] < value) return;

      dispatch(passengersCountChange({ type: name, count: Number(value) }));
   };

   const handleClick = (classType) => {
      dispatch(coachClassChange({ coachClass: classType, type }));
      dispatch(coachItemsClear({ type }));
   };

   const handleCoachClick = (id) => {
      if (coachItems.includes(id)) {
         dispatch(coachItemsUnSelect({ id, type }));
      } else {
         dispatch(coachItemsSelect({ id, type }));
      }
   };

   const handleBack = () => {
      dispatch(coachItemsClear({ type }));
      navigate(-1);
   };

   return (
      <div className="ticket">
         <div className="ticket-header ticket-header__route--there">
            <div
               className={`ticket-header__actions ${
                  type === 'departure' ? '' : 'routeBack'
               }`}
            >
               {type === 'departure' ? routeTo : routeBack}
               <button
                  type="button"
                  className="button ticket-header__button"
                  onClick={handleBack}
               >
                  Выбрать другой поезд
               </button>
            </div>
            <Train train={train} type={type} option="ticket-header__train" />
         </div>
         <section className="ticket-count">
            <h4 className="ticket-title ticket-count__title">
               Количество билетов
            </h4>
            <div className="ticket-count__wrapper">
               <div className="ticket-count__card ticket-count__card--adults">
                  <select
                     className="ticket-count__list"
                     name="adult"
                     value={passengersCount.adult}
                     onChange={(event) =>
                        handleChange(event.target.name, event.target.value)
                     }
                  >
                     {[0, 1, 2, 3, 4].map((el) => (
                        <option
                           className="ticket-count__item"
                           value={el}
                           key={`adult${el}`}
                        >
                           Взрослых — {el}
                        </option>
                     ))}
                  </select>
                  {available.adult > 0 && (
                     <p className="ticket-count__text">
                        Можно добавить еще {available.adult}{' '}
                        {available.adult > 1 ? 'пассажиров' : 'пассажира'}
                     </p>
                  )}
               </div>
               <div className="ticket-count__card ticket-count__card--children">
                  <select
                     className="ticket-count__list"
                     name="child"
                     value={passengersCount.child}
                     onChange={(event) =>
                        handleChange(event.target.name, event.target.value)
                     }
                  >
                     {[0, 1, 2, 3].map((el) => (
                        <option
                           className="ticket-count__item"
                           value={el}
                           key={`child${el}`}
                        >
                           Детских — {el}
                        </option>
                     ))}
                  </select>
                  {available.child > 0 && (
                     <p className="ticket-count__text count-child">
                        Можно добавить еще {available.child}{' '}
                        {available.child > 1 ? 'детей' : 'ребенка'} до 10
                        лет.Свое место в вагоне, как у взрослых, но дешевле в
                        среднем на 50-65%
                     </p>
                  )}
               </div>
               <div className="ticket-count__card">
                  <select
                     className="ticket-count__list"
                     name="baby"
                     value={passengersCount.baby}
                     onChange={(event) =>
                        handleChange(event.target.name, event.target.value)
                     }
                  >
                     {[0, 1, 2, 3, 4].map((el) => (
                        <option
                           className="ticket-count__item"
                           value={el}
                           key={`baby${el}`}
                        >
                           Детских «без места» — {el}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         </section>
         <section className="ticket-class">
            <h4 className="ticket-title ticket-class__title">Тип вагона</h4>
            <ul className="ticket-class__list">
               {Object.keys(classes).map((el) =>
                  classes[el].available ? (
                     <li className="ticket-class__item" key={el}>
                        <button
                           type="button"
                           className={`ticket-class__button ${
                              coachClass === el
                                 ? 'ticket-class__button--active'
                                 : ''
                           }`}
                           disabled={!classes[el].available}
                           onClick={() => handleClick(el)}
                        >
                           {classes[el].icon}
                           <p className="ticket-class__name">
                              {classes[el].name}
                           </p>
                        </button>
                     </li>
                  ) : (
                     ''
                  )
               )}
            </ul>
         </section>
         {coachList.filter((el) => el.coach.class_type === coachClass).length >
            0 && (
            <div className="ticket-coach">
               <div className="ticket-coach__header">
                  <ul className="ticket-coach__list">
                     Вагоны
                     {coachList
                        .filter((el) => el.coach.class_type === coachClass)
                        .map((el) => (
                           <li
                              className={`ticket-coach__item ${
                                 coachItems.includes(el.coach._id)
                                    ? 'ticket-coach__item--active'
                                    : ''
                              }`}
                              key={el.coach._id}
                              onClick={() => handleCoachClick(el.coach._id)}
                           >
                              {el.coach._id.toString().slice(-2)}
                           </li>
                        ))}
                  </ul>
                  <p className="ticket-coach__numbering">
                     Нумерация вагонов начинается с головы поезда
                  </p>
               </div>
               {coachList
                  .filter(
                     (el) =>
                        el.coach.class_type === coachClass
                  )
                  .map((el) => (
                     <Coach
                        key={el.coach._id}
                        coach={el.coach}
                        seatsList={el.seats}
                        typeTicket={type}
                     />
                  ))}
            </div>
         )}
      </div>
   );
}

Ticket.propTypes = {
   type: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import RouteInput from '../RouteInput';
import { cityExchange } from "../../../slices/searchSlice";

export default function Routes({ formView }) {
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(cityExchange());
   };

   return (
      <div className="search-form__fieldset">
         <div from="cities" className={`search-form__title ${formView}-title`}>
            Направление
            <div className="search-form__controls">
               <RouteInput placeholder="Откуда" direction="routeFrom" />
               <button
                  type="button"
                  className="search-form__swap"
                  onClick={handleClick}
               />
               <RouteInput placeholder="Куда" direction="routeIn" />
            </div>
         </div>
      </div>
   );
}

Routes.propTypes = {
   formView: PropTypes.string.isRequired,
};

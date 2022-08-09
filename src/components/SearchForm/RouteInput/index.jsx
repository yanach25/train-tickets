/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { searchFieldChange } from "../../../slices/searchSlice";

export default function RouteInput({ placeholder, direction }) {
   const [visible, setVisible] = useState(false);

   const [value, setValue] = useState('');
   const { routeFrom, routeIn } = useSelector((state) => state.search);
   const route = direction === 'routeFrom' ? routeFrom.city : routeIn.city;
   const [cities, setCities] = useState(route);

   useEffect(() => {
      setValue(route);
      const controller = new AbortController();
      fetch(`${process.env.REACT_APP_URL}/routes/cities?name=${route || 'А'}`, {
         signal: controller.signal,
      })
         .then((response) => response.json())
         .then((data) => {
            setCities(data);
            return () => controller.abort();
         });
   }, [route]);

   const onBlur = (event) => {
      event.preventDefault();
      setTimeout(() => setVisible(false), 1000);
   };

   const dispatch = useDispatch();

   const onFieldChangeDispatch = (id, city) => {
      setValue(city);
      dispatch(
         searchFieldChange({
            name: direction,
            value: {
               id,
               city,
            },
         })
      );
   };

   const onFieldChange = (e) => {
      const { target } = e;
      setValue(target.value);
      const citiObj =
         cities &&
         cities.find((city) => city.name === target.value.toLowerCase());
      const id = citiObj ? citiObj._id : '';
      onFieldChangeDispatch(id, target.value);
   };

   return (
      <div className="search-form__route-container">
         <input
            id="cities"
            className="search-form__field search-form__field-route"
            type="text"
            placeholder={placeholder || ''}
            onClick={() => setVisible(true)}
            onChange={onFieldChange}
            onBlur={onBlur}
            name={direction}
            value={value}
         />
         {visible && (
            <div className="autocomplete-list">
               {cities.length > 0 ? (
                  cities.map((city) => (
                     <p
                        className="autocomplete-list__item"
                        key={city._id}
                        onClick={() =>
                           onFieldChangeDispatch(city._id, city.name)
                        }
                     >
                        {city.name}
                     </p>
                  ))
               ) : (
                  <p className="autocomplete-list__item">Направление не найдено!</p>
               )}
            </div>
         )}
      </div>
   );
}

RouteInput.defaultProps = {
   placeholder: '',
};

RouteInput.propTypes = {
   placeholder: PropTypes.string,
   direction: PropTypes.string.isRequired,
};

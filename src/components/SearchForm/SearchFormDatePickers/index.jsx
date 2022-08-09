/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import '../SearchForm.css';
import { searchFieldChange } from "../../../slices/searchSlice";

export default function DatePickers({ formView }) {
   const dispatch = useDispatch();
   const dateStart = useSelector((state) => state.search.date_start);
   const dateEnd = useSelector((state) => state.search.date_end);
   const [start, setStart] = useState();
   const [end, setEnd] = useState();

   useEffect(() => {
      if (dateStart) {
         setStart(new Date(dateStart));
      }
   }, [dateStart]);

   useEffect(() => {
      if (dateEnd) {
         setEnd(new Date(dateEnd));
      }
   }, [dateEnd]);

   const handleChange = (name, date) => {
      const str = date.toLocaleDateString();
      const format = `${str.slice(-4)}-${str.slice(3, 5)}-${str.slice(0, 2)}`;
      dispatch(
         searchFieldChange({
            name,
            value: format,
         })
      );
   };

   const Input = forwardRef(({ value, onClick }, ref) => (
      <input
         className={`search-form__field search-form__field-date ${
            formView ? `${formView}-field` : ''
         }`}
         type="text"
         placeholder="ДД/ММ/ГГ"
         value={value}
         onClick={onClick}
         onChange={onClick}
         ref={ref}
      />
   ));

   return (
      <div className={`search-form__fieldset ${formView}-fieldset`}>
         <p className={`search-form__title ${formView}-title`}>Дата</p>
         <div className="search-form__controls">
            <DatePicker
               locale={ru}
               dateFormat="dd.MM.yyyy"
               selected={start}
               selectsStart
               startDate={start}
               endDate={end}
               customInput={<Input />}
               onChange={(date) => handleChange('date_start', date)}
            />
            <DatePicker
               locale={ru}
               dateFormat="dd.MM.yyyy"
               selected={end}
               selectsEnd
               startDate={start}
               endDate={end}
               minDate={start}
               customInput={<Input />}
               onChange={(date) => handleChange('date_end', date)}
            />
         </div>
      </div>
   );
}

DatePickers.propTypes = {
   formView: PropTypes.string.isRequired,
};

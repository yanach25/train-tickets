/* eslint-disable react/prop-types */

import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { searchFieldChange } from '../../../../../slices/searchSlice';
import './DataFilter.css';

export default function DateFilter() {
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
         className="date-filter__field date-filter__field-date"
         type="text"
         placeholder="ДД/ММ/ГГ"
         value={value}
         onClick={onClick}
         onChange={onClick}
         ref={ref}
      />
   ));

   return (
      <div className="date-filter__fieldset">
         <div className="date-filter__controls">
            <div className="date-filter__control">
               <label className="date-filter__title">
                  Дата поездки
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
               </label>
            </div>
            <div className="date-filter__control">
               <label className="date-filter__title">
                  Дата возвращения
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
               </label>
            </div>
         </div>
      </div>
   );
}

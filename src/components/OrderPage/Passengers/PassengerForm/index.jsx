import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import validateDocument from './validateDocument';
import { addPassengersData } from '../../../../slices/passengersSlice';
import './PassengerForm.css';

export default function PassengerForm({ number, type }) {
   const dispatch = useDispatch();

   const [active, setActive] = useState(false);

   const { passengers } = useSelector((state) => state.passengers);
   const passenger = passengers.find((e) => e.number === number);

   // if (passenger && passenger.series) {
   //    setDocumentType('passport');
   // }

   const [documentType, setDocumentType] = useState(
      type === 'adult' || (passenger && passenger.series)
         ? 'passport'
         : 'certificate'
   );

   const [form, setForm] = useState({
      number,
      type,
      surname: passenger ? passenger.surname : '',
      name: passenger ? passenger.name : '',
      lastname: passenger ? passenger.lastname : '',
      sex: passenger ? passenger.sex : '',
      birth: passenger ? passenger.birth : '',
      series: passenger ? passenger.series : '',
      document: passenger ? passenger.document : '',
   });
   const [message, setMessage] = useState('');

   const handleShow = () => {
      setActive((prev) => !prev);
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleRadio = (event) => {
      setForm((prev) => ({ ...prev, sex: event.target.dataset.id }));
   };

   const manageMessages = (text) => {
      setMessage(text);
      setTimeout(() => setMessage(''), 10 * 1000);
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (!(form.surname.trim() && form.name.trim() && form.lastname.trim())) {
         manageMessages('Необходимо ввести фамилию, имя и отчество пассажира');
         return;
      }
      if (!form.sex) {
         manageMessages('Выберите пол пассажира');
         return;
      }
      if (!form.birth) {
         manageMessages('Укажите дату рождения в формате дд-мм-гг');
         return;
      }
      if (
         documentType === 'certificate' &&
         !validateDocument(documentType, form.document)
      ) {
         manageMessages(
            'Номер свидетельства о рожденни указан некорректно Пример: VIII-ЫП-123456'
         );
         return;
      }
      if (
         documentType === 'passport' &&
         (!(form.series && validateDocument('series', form.series)) ||
            !validateDocument(documentType, form.document))
      ) {
         manageMessages('Номер или серия паспорта введы не некорректно');
         return;
      }
      setMessage('');
      dispatch(addPassengersData({ number, data: form }));
   };

   return (
      <div className="passenger-form">
         <div className={`passenger-header ${active ? 'active-form' : ''}`}>
            <h4 className="title passenger-title">
               <span
                  className={`passenger-toggle ${active ? 'hide' : 'show'}`}
                  onClick={handleShow}
               />
               Пассажир {number}
            </h4>
            <button type="button" className="passenger-delete__button" />
         </div>

         <div
            className={`passenger-form__form ${
               active ? 'passenger-form__active' : 'hidden'
            }`}
         >
            <form className="passenger-form__section">
               <select
                  className="passenger-form__field passenger-form__list"
                  defaultValue={type}
                  disabled
               >
                  <option className="passenger-form__item" value="adult">
                     Взрослый
                  </option>
                  <option className="passenger-form__item" value="child">
                     Детский
                  </option>
               </select>
               <div className="passenger-form__controls">
                  <label
                     className="passenger-form__label"
                     htmlFor={`surname${number}`}
                  >
                     Фамилия
                     <input
                        className="passenger-form__field passenger-form__field-name"
                        id={`surname${number}`}
                        type="text"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                     />
                  </label>
                  <label
                     className="passenger-form__label"
                     htmlFor={`name${number}`}
                  >
                     Имя
                     <input
                        className="passenger-form__field passenger-form__field-name"
                        id={`name${number}`}
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                     />
                  </label>
                  <label
                     className="passenger-form__label"
                     htmlFor={`lastname${number}`}
                  >
                     Отчество
                     <input
                        className="passenger-form__field passenger-form__field-name"
                        id={`lastname${number}`}
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                     />
                  </label>
               </div>
            </form>

            <div className="passenger-form__controls passenger-form__section">
               <div className="passenger-form__radio-group">
                  <p className="passenger-form__label">Пол</p>
                  <div className="passenger-form__radio-controls">
                     <input
                        className="passenger-form__radio-field"
                        id={`male${number}`}
                        data-id="male"
                        name={`sex${number}`}
                        type="radio"
                        checked={form.sex === 'male'}
                        onChange={handleRadio}
                     />
                     <label
                        className="passenger-form__radio-label passenger-form__radio-label--male"
                        htmlFor={`male${number}`}
                     >
                        М
                     </label>
                     <input
                        className="passenger-form__radio-field"
                        id={`female${number}`}
                        data-id="female"
                        name={`sex${number}`}
                        type="radio"
                        checked={form.sex === 'female'}
                        onChange={handleRadio}
                     />
                     <label
                        className="passenger-form__radio-label passenger-form__radio-label--female"
                        htmlFor={`female${number}`}
                     >
                        Ж
                     </label>
                  </div>
               </div>

               <label
                  className="passenger-form__label"
                  htmlFor={`birth${number}`}
               >
                  Дата рождения
                  <input
                     className="passenger-form__field"
                     id={`birth${number}`}
                     type="text"
                     placeholder="ДД/ММ/ГГ"
                     name="birth"
                     value={form.birth}
                     onChange={handleChange}
                  />
               </label>
            </div>

            <div className="passenger-form__controls passenger-form__section checkbox-control">
               <input className="passenger-form__checkbox" type="checkbox" />
               <p className="passenger-form__checkbox-label">
                  ограниченная подвижность
               </p>
            </div>

            <div className="passenger-form__section">
               <div className="passenger-form__document">
                  <label className="passenger-form__label">
                     Тип документа
                     <select
                        className={`passenger-form__field passenger-form__list passenger-form__list--${documentType}`}
                        value={documentType}
                        onChange={(event) =>
                           setDocumentType(event.target.value)
                        }
                     >
                        <option className="passenger-form__item" value="passport">
                           Паспорт РФ
                        </option>
                        {type !== 'adult' ? (
                           <option
                              className="passenger-form__item"
                              value="certificate"
                           >
                              Свидетельство о рождении
                           </option>
                        ) : (
                           ''
                        )}
                     </select>
                  </label>
                  {documentType === 'passport' && (
                     <label
                        className="passenger-form__label"
                        htmlFor={`series${number}`}
                     >
                        Серия
                        <input
                           className="passenger-form__field passenger-form__field--document"
                           id={`series${number}`}
                           type="text"
                           placeholder="_ _ _ _"
                           name="series"
                           value={form.series}
                           onChange={handleChange}
                        />
                     </label>
                  )}
                  <label
                     className="passenger-form__label"
                     htmlFor={`document${number}`}
                  >
                     Номер
                     <input
                        className="passenger-form__field passenger-form__field--document"
                        id={`document${number}`}
                        type="text"
                        placeholder={
                           documentType === 'passport'
                              ? '_ _ _ _ _ _'
                              : '12 символов'
                        }
                        name="document"
                        value={form.document}
                        onChange={handleChange}
                     />
                  </label>
               </div>
            </div>
            <div
               className={`passenger-form__footer passenger-form__section ${
                  passenger ? 'done' : ''
               } ${message ? 'warning' : ''}`}
            >
               {passenger && (
                  <div className="passenger-form__massage">
                     <span className="massage-done__img" />
                     <span className="massage-done">Готово</span>
                  </div>
               )}
               {message ? (
                  <div className="passenger-form__massage">
                     <span className="massage-warning__img" />
                     <span className="massage-warning">{message}</span>
                  </div>
               ) : (
                  <button
                     type="button"
                     className="button passenger-form__button"
                     onClick={onSubmit}
                  >
                     Следующий пассажир
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}

PassengerForm.propTypes = {
   type: PropTypes.string.isRequired,
   number: PropTypes.number.isRequired,
};

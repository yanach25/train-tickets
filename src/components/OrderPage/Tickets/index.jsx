import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { filterChange } from '../../../slices/filterSlice';
import Train from './Train';
import Pagination from './Pagination';

import './TrainList.css';
import { fetchRoutes } from '../../../slices/routesSlice';
import { stageChange } from '../../../slices/stageSlice';

export default function TrainList() {
   const dispatch = useDispatch();
   const count = useSelector((state) => state.routes.total_count);
   const trains = useSelector((state) => state.routes.routes);
   const filter = useSelector((state) => state.filter);
   const search = useSelector((state) => state.search);
   const { sort, limit } = filter;

   const limits = [5, 10, 20];

   useEffect(() => {
      dispatch(stageChange({ stage: 1 }));
   }, []);

   useEffect(() => {
      dispatch(fetchRoutes());
   }, [filter, search]);

   const handleChange = (name, value) => {
      dispatch(filterChange({ name, value }));
   };

   return (
      <section className="train-list order-options">
         <div className="train-list__header">
            <div className="trains-total__count">найдено {count}</div>

            <div className="train-list__sort">
               <h5 className="train-list__sort-title">сортировать по:</h5>
               <select
                  className="train-list__sort-list"
                  name="sort"
                  value={sort}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
               >
                  <option className="train-list__sort-item" value="time">
                     времени
                  </option>
                  <option className="train-list__sort-item" value="price_min">
                     стоимости
                  </option>
                  <option className="train-list__sort-item" value="duration">
                     длительности
                  </option>
               </select>
            </div>

            <div className="train-list__view">
               <h5 className="train-list__title">показывать по:</h5>
               <ul className="train-list__view-list">
                  {limits.map((el) => (
                     <li
                        className={`train-list__view-item ${
                           limit === el ? 'train-list__view-item--active' : ''
                        }`}
                        key={el}
                        onClick={() => handleChange('limit', el)}
                     >
                        {el}
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         <div className="train-list__wrapper">
            {trains.map((el) => (
               <Train key={nanoid()} train={el} />
            ))}
         </div>

         <Pagination />
      </section>
   );
}

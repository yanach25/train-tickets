/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import LastTicket from './LastTicket';
import './Last.css';

export default function Last() {
   const [items, setItems] = useState([]);

   useEffect(() => {
      fetch('https://fe-diplom.herokuapp.com/routes/last')
         .then((response) => response.json())
         .then((data) => setItems(data))
         .catch((err) => console.log(err));
   }, []);

   if (items.length === 0) return '';
   return (
      <section className="last">
         <h3 className="last-title">Последние билеты</h3>
         <div className="last-list">
            {items.map((item) => (
               <LastTicket ticket={item} key={item.departure._id} />
            ))}
         </div>
      </section>
   );
}

import React from 'react';
import './OrderFormSet.css';
import SearchForm from "../../SearchForm";

export default function OrderFormSet() {
   return (
      <section className="order-form-set">
         <div className="content-wrapper order-form-wrapper">
            <SearchForm formView="orderForm" />
         </div>
      </section>
   );
}

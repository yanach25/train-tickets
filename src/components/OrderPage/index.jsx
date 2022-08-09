import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './OrderPage.css';
import { useSelector } from "react-redux";
import OrderFormSet from "./OrderFormSet";
import StageBar from "./StageBar";
import SideBar from "./SideBar";
import TrainList from "./Tickets";
import Seats from "./Tickets/Seats";
import Passengers from "./Passengers";
import PayForm from "./PayForm";
import Verification from "./Verification";

export default function OrderPage() {
    const download = useSelector(state => state.routes.status);
    const loading = download === 'pending'
        ? <div className="order-page__pending-wrapper"><div className="pending"/></div>
        : '';

    return (
        <div className="order-page">
            <div className="order-page__form-wrapper">
                <OrderFormSet />
                {loading}
            </div>
            <StageBar />
            <div className="order-page__wrapper">
                <div className="content-wrapper">
                    <SideBar />
                    <Routes>
                        <Route path="/tickets/train" element={<TrainList />} />
                        <Route path="/tickets/seats" element={<Seats />} />
                        <Route path="/passengers/" element={<Passengers />} />
                        <Route path="/pay/" element={<PayForm />} />
                        <Route path="/verification/" element={<Verification />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage  from './components/HomePage';
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderPage from "./components/OrderPage";
import SuccessPage from "./components/SuccessPage";
import PageNotFound from "./components/PageNotFound";

function App() {
   return (
      <Router>
         <Header />
         <main className="main-container">
            <Routes>
               <Route path="/fe-diploma" element={<HomePage />} />
               <Route path="/" element={<HomePage />} />
               <Route path="/order/*" element={<OrderPage />} />
               <Route path="/success/*" element={<SuccessPage />} />
               <Route path="/*" element={<PageNotFound />} />
            </Routes>
         </main>
         <Footer />
      </Router>
   );
}

export default App;

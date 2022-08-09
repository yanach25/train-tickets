import React from 'react';
import HomeFormSet from "./HomeFormSet";
import About from "./About";
import HowItWorks from "./HowItWorks";
import Reviews from "./Reviews";

export default function HomePage() {
   return (
      <div className="homepage">
         <HomeFormSet />
         <About />
         <HowItWorks />
         <Reviews />
      </div>
   );
}

import React from 'react';
import { useSelector } from 'react-redux';

import Parameters from './Parameters';
import Last from './Last';
import Details from './Details';

export default function SideBar() {
   const { stage } = useSelector((state) => state.stage);
   return (
      <div className="side-bar">
         {stage === 1 ? (
            <div>
               <Parameters />
               <Last />
            </div>
         ) : (
            <div>
               <Details />
            </div>
         )}
      </div>
   );
}

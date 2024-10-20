import React from 'react';
import '../Css/Quests.css';

const Gas = ({GoGas, Gas_val, telegram}) => {
    
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe to Founder on Gaspump</p>
                <p className='questSubtitle'>+1000 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!Gas_val &&(<button className='questBtn' onClick={GoGas}>GO!</button>)}
        </div>
    </div>
  );
};

export default Gas;

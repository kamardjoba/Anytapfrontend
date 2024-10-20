import React from 'react';
import '../Css/Quests.css';

const GasChanel = ({GoGasChanelNomer5, GasChanel_val, telegram}) => {
    
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Community Chat</p>
                <p className='questSubtitle'>+1000 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!GasChanel_val &&(<button className='questBtn' onClick={GoGasChanelNomer5}>GO!</button>)}
        </div>
    </div>
  );
};

export default GasChanel;

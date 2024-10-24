import React from 'react';
import '../Css/Quests.css';

const Partners = ({GoPartners, Partners_val, telegram}) => {
    
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Partners Channel</p>
                <p className='questSubtitle'>+1000 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!Partners_val &&(<button className='questBtn' onClick={GoPartners}>GO!</button>)}
        </div>
    </div>
  );
};

export default Partners;

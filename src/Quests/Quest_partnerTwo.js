import React from 'react';
import '../Css/Quests.css';

const PartnersTwo = ({GoPartners2, Partners_val2, telegram}) => {
    
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
            {!Partners_val2 &&(<button className='questBtn' onClick={GoPartners2}>GO!</button>)}
        </div>
    </div>
  );
};

export default PartnersTwo;

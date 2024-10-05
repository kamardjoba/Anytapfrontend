import React from 'react';
import '../Css/Quests.css';

const TgAppChanell = ({AppCenterChanel_val, telegram, GoFox}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Mini Apps Center Channel</p>
                <p className='questSubtitle'>+1000 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!AppCenterChanel_val &&(<button className='questBtn' onClick={GoFox} >GO!</button>)}
        </div>
    </div>
  );
};

export default TgAppChanell;

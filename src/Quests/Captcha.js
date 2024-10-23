import React from 'react';
import '../Css/Quests.css';

const GasChanel = ({GoCaptcha, GoCaptcha_val, telegram}) => {
    
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Complete the CAPTCHA via the link</p>
                <p className='questSubtitle'>+500 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!GoCaptcha_val &&(<button className='questBtn' onClick={GoCaptcha}>GO!</button>)}
        </div>
    </div>
  );
};

export default GasChanel;

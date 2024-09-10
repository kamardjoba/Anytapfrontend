
import React from 'react';
import '../Css/Quests.css';


const Botview = ({ GoBot, Bot_val ,telegram}) => {
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
            <img src={telegram} alt="Description of x_chan" loading="lazy" />
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Join MarsGo and get $MBASE</p>
                <p className='questSubtitle'>+500 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!Bot_val && (<button className='questBtn' onClick={GoBot}>GO!</button>)}
        </div>
    </div>
  );
};

export default Botview ;

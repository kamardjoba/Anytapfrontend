
import React from 'react';
import '../Css/Quests.css';


const BotBourekas = ({ GoBotBourekas, BotBourekas_val ,telegram}) => {
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
            <img src={telegram} alt="Description of x_chan" loading="lazy" />
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Join Bourekas and get $BREAD</p>
                <p className='questSubtitle'>+500 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!BotBourekas_val && (<button className='questBtn' onClick={GoBotBourekas}>GO!</button>)}
        </div>
    </div>
  );
};

export default BotBourekas ;

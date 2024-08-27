import React from 'react';
import '../Css/Quests.css';

const tgQuest = ({GoTg, TgChanel_val, telegram}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Telegram channel</p>
                <p className='questSubtitle'>+200 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!TgChanel_val &&(<button className='questBtn' onClick={GoTg}>GO!</button>)}
        </div>
    </div>
  );
};

export default tgQuest;

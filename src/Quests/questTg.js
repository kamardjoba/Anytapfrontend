import React from 'react';
import '../Css/Quests.css';
import telegram from'../IMG/telegram.svg';

const tgQuest = ({GoTg}) => {

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
            <button className='questBtn' onClick={GoTg}>GO!</button>
        </div>
    </div>
  );
};

export default tgQuest;
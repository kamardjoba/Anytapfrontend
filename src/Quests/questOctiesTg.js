import React from 'react';
import '../Css/Quests.css';

const tgOctiesQuest = ({GoOct,TgOcties_val, telegram}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Octies channel</p>
                <p className='questSubtitle'>+200 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!TgOcties_val &&(<button className='questBtn' onClick={GoOct}>GO!</button>)}
        </div>
    </div>
  );
};

export default tgOctiesQuest;

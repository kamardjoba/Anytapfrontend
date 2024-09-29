import React from 'react';
import '../Css/Quests.css';

const FoxQuest = ({TgFox_val, telegram, GoFox}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Crypto Fox Lab channel</p>
                <p className='questSubtitle'>+1000 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!TgFox_val &&(<button className='questBtn' onClick={GoFox} >GO!</button>)}
        </div>
    </div>
  );
};

export default FoxQuest;

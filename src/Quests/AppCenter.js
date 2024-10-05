import React from 'react';
import '../Css/Quests.css';

const TgAppCenter = ({AppCenter_val, telegram, GoAppCenter}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Explore Mini Apps Center</p>
                <p className='questSubtitle'>+1000 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!AppCenter_val &&(<button className='questBtn' onClick={GoAppCenter} >GO!</button>)}
        </div>
    </div>
  );
};

export default TgAppCenter;

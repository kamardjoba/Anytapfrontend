
import React from 'react';
import '../Css/Quests.css';


const XQuest = ({ GoX, X_val ,X}) => {
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
            <img src={X} alt="Description of x_chan"  />
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe X channel</p>
                <p className='questSubtitle'>+200 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!X_val && (
                <button className='questBtn' onClick={GoX}>GO!</button>
            )}
        </div>
    </div>
  );
};

export default XQuest;

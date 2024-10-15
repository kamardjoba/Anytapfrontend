
import React from 'react';
import '../Css/Quests.css';


const MushroomQuest = ({ GoMushrom, MushroomQuest_val , telegram}) => {
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
            <img src={telegram} alt="Description of x_chan" />
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Join Mushroom Warrior and earn airdrop</p>
                <p className='questSubtitle'>+500 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!MushroomQuest_val && (
                <button className='questBtn' onClick={GoMushrom}>GO!</button>
            )}
        </div>
    </div>
  );
};

export default MushroomQuest;

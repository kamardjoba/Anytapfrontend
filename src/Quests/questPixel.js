
import React from 'react';
import '../Css/Quests.css';

const PixelQuest = ({ GoPixel, PixelQuest_val , telegram}) => {
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
            <img src={telegram} alt="Description of x_chan" />
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Join Pixel Mine & Earn Wallet</p>
                <p className='questSubtitle'>+500 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!PixelQuest_val && (
                <button className='questBtn' onClick={GoPixel}>GO!</button>
            )}
        </div>
    </div>
  );
};

export default PixelQuest;

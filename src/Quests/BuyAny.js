import React from 'react';
import '../Css/Quests.css';

const BuyAny = ({GoBuyAny, BuyAny_val, chart_bar}) => {
    
  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={chart_bar} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Buy $ANY token for 5 Ton</p>
                <p className='questSubtitle'>+2000 points and special NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!BuyAny_val &&(<button className='questBtn' onClick={GoBuyAny}>GO!</button>)}
        </div>
    </div>
  );
};

export default BuyAny;

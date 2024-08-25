import React from 'react';
import '../Css/Quests.css';

const WeeklyNft = ({GoWeekNft, WeeklyNft_val, arrows}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={arrows} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Mint Weekly NFT</p>
                <p className='questSubtitle'>+2500 Points and Weekly NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!WeeklyNft_val &&(<button className='questBtn' onClick={GoWeekNft}>Mint</button>)}
        </div>
    </div>
  );
};

export default WeeklyNft;
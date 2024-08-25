import React from 'react';
import '../Css/Quests.css';


const FrendsQuest = ({GoFrands, Frends_val, invite}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={invite} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Invite 10 friends</p>
                <p className='questSubtitle'>+5000 Points and Referral NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!Frends_val && (<button className='questBtn' onClick={GoFrands}>Mint</button>)}
        </div>
    </div>
  );
};

export default FrendsQuest;
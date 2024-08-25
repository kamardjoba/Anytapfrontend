import React from 'react';
import '../Css/Quests.css';

const MintStartNft = ({GoStartNft, StartNft_val, MintStart}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={MintStart} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Mint Start NFT</p>
                <p className='questSubtitle'>+1000 Points and free NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!StartNft_val && (<button className='questBtn' onClick={GoStartNft}>Mint</button>)}
        </div>
    </div>
  );
};

export default MintStartNft;
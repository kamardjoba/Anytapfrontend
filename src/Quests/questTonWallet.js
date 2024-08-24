import React, { useState } from 'react';
import '../Css/Quests.css';
import wallet from '../IMG/wallet.svg';
import { connectWallet, getWalletAddress } from '../TonConnect'; 

const TonW = ({ GoWallet, Wallet_val }) => {
  const [walletAddress, setWalletAddress] = useState(getWalletAddress());

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setWalletAddress(getWalletAddress());
      GoWallet(); 
    }
  };

  return (
    <div className='questItem'>
      <div className='questItemLeft'>
        <div className='questIcon'>
          <img src={wallet} alt="" />
        </div>
        <div className='questItemLeftContent'>
          <p className='questTitle'>Ton Wallet Connect</p>
          <p className='questSubtitle'>+500 points</p>
        </div>
      </div>
      <div className='questItemRight'>
        {!Wallet_val && (
          <button className='questBtn' onClick={handleConnect}>
            {walletAddress ? `Connected: ${walletAddress}` : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TonW;

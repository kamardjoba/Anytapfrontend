import React, { useState } from 'react';
import '../Css/Quests.css';
import wallet from '../IMG/wallet.svg';
import { connectWallet, getWalletAddress } from '../TonConnect'; 

const TonW = ({ GoWallet }) => {
  const [walletAddress, setWalletAddress] = useState(getWalletAddress());

  const handleConnect = async () => {
    try {
      console.log('Attempting to connect wallet...');
      const wallet = await connectWallet();
      if (wallet) {
        setWalletAddress(getWalletAddress());
        GoWallet();
        console.log('Wallet connected:', wallet);
      } else {
        console.log('Wallet connection failed or was cancelled.');
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
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
        <button className='questBtn' onClick={handleConnect}>
          {walletAddress ? `Connected: ${walletAddress}` : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default TonW;

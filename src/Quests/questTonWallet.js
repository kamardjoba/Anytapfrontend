import React, { useState } from 'react';
import '../Css/Quests.css';
import wallet from '../IMG/wallet.svg';
import { TonConnect } from '@tonconnect/sdk';


const connector = new TonConnect({
    manifestUrl: 'https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json',
});

export const connectWallet = async () => {
    try {
        await connector.restoreConnection();
        if (!connector.connected) {
            await connector.connectWallet();
        }
        return connector.wallet;
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        return null;
    }
};

console.log("TonConnect.js loaded");
console.log("connectWallet function:", typeof connectWallet);

export const disconnectWallet = () => {
    connector.disconnect();
};

export const getWalletAddress = () => {
    return connector.connected ? connector.wallet?.account.address : null;
};

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

import React from 'react';
import '../Css/Quests.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import wallet from '../IMG/wallet.svg';

const manifestUrl = 'https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json'; // URL к манифесту

const TonW = ({ Wallet_val }) => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className='questItem'>
        <div className='questItemLeft'>
          <div className='questIcon'>
            <img src={wallet} alt="wallet icon"/>
          </div>
          <div className='questItemLeftContent'>
            <p className='questTitle'>Ton Wallet Connect</p>
            <p className='questSubtitle'>+500 points</p>
          </div>
        </div>
        <div className='questItemRight'>
          {!Wallet_val && (
            <TonConnectButton />
          )}
        </div>
      </div>
    </TonConnectUIProvider>
  );
};

export default TonW;

import React from 'react';
import '../Css/Quests.css';
import wallet from'../IMG/wallet.svg';
import { TonConnectUIProvider, TonConnectButton} from '@tonconnect/ui-react';


const TonW = ({GoWallet, Wallet_val}) => {

  return (
    <TonConnectUIProvider manifestUrl="https://resilient-madeleine-9ff7c2.netlify.app/tonconnect-manifest.json">
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={wallet} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Ton Wallet Connect</p>
                <p className='questSubtitle'>+500 points</p>
            </div>
        </div>
        <div className='questItemRight'>
        {!Wallet_val &&(<button className='questBtn' onClick={GoWallet}>Connect</button>)}
        <TonConnectButton/>
        </div>
    </div>
    </TonConnectUIProvider>
  );
};

export default TonW;
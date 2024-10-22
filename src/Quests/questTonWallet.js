import React, { useEffect } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider, TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonW = ({ telegramId, wallet }) => {
  const [tonConnectUI] = useTonConnectUI();
  const walletAddress = useTonAddress(); 

  useEffect(() => {
    const saveWalletAddress = async () => {
      if (walletAddress) { 
        console.log('Кошелек подключен! Адрес:', walletAddress, telegramId);
        try {
          await axios.post('https://anypatbackend-production.up.railway.app/save-wallet-address', {
            telegramId,
            walletAddress
          });
          console.log('Адрес кошелька успешно сохранен.');
        } catch (error) {
          console.error('Ошибка при сохранении адреса кошелька:', error);
        }
      } else {
        console.error('Адрес кошелька не найден или не определен');
      }
    };

    saveWalletAddress();
  }, [walletAddress, telegramId]);

  useEffect(() => {
    if (tonConnectUI) {
        tonConnectUI.onStatusChange(async (walletInfo) => {
            if (walletInfo) {
                console.log('Кошелек подключен!', walletInfo);
            }
        });
    }
  }, [tonConnectUI, telegramId]);

  return (
    <TonConnectUIProvider  manifestUrl="https://anytap.org/tonconnect-manifest.json">
      <div className='questItemTon'>
          <div className='questItemLeft'>
              <div className='questIcon'>
                  <img src={wallet} alt=""/>
              </div>
              <div className='questItemLeftContent'>
                  <p className='questTitle'>Wallet Connect</p>
              </div>
          </div>
          <div className='questItemRight'>
          <div className='feikton'>
            <TonConnectButton/>
          </div>
          </div>
      </div>
    </TonConnectUIProvider>
  );
};

export default TonW;

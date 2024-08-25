import React, { useEffect } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonW = ({ Wallet_val, setWallet_val, telegramId, wallet }) => {
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (tonConnectUI) {
        tonConnectUI.onStatusChange(async (walletInfo) => {
            if (walletInfo) {
                console.log('Кошелек подключен!', walletInfo);
                setWallet_val(true);  // Устанавливаем Wallet_val в true

                // Отправляем запрос на сервер для добавления 500 монет
                try {
                    const response = await axios.post('https://anypatbackend-production.up.railway.app/wallet-connected', { telegramId });
                    if (response.data.success) {
                        console.log('500 монет добавлено пользователю');
                    } else {
                        console.error('Ошибка при начислении монет:', response.data.message);
                    }
                } catch (error) {
                    console.error('Ошибка при добавлении монет:', error);
                }
            }
        });
    }
  }, [tonConnectUI, setWallet_val, telegramId]);

  return (
    <TonConnectUIProvider manifestUrl="https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json">
    <div className='questItem'>
        <div className='questIcon'>
            <img src={wallet} alt=""/>
        </div>
        <div className='questItemLeftContent'>
            <p className='questTitle'>Ton Wallet Connect</p>
            <p className='questSubtitle'>+500 points</p>
        </div>
        <div className='questItemRight'>
        {!Wallet_val && (<TonConnectButton/>)}
        </div>
    </div>
    </TonConnectUIProvider>
  );
};

export default TonW;

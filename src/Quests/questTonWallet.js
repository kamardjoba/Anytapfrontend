import React, { useEffect } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonW = ({ Wallet_val, telegramId, wallet }) => {
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (tonConnectUI) {
        tonConnectUI.onStatusChange(async (walletInfo) => {
            if (walletInfo) {
                console.log('Кошелек подключен!', walletInfo);
                localStorage.setItem('Wallet_val', 'true');

                // Отправляем запрос на сервер для добавления 500 монет пользователю
                try {
                    const response = await axios.post('https://anypatbackend-production.up.railway.app/wallet-connected', { telegramId });
                    if (response.data.success) {
                        console.log('500 монет добавлено пользователю');

                        // Теперь отправляем запрос на обновление монет у реферера
                        const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 500 });
                        if (referralUpdateResponse.data.success) {
                            console.log('Монеты реферера обновлены');
                        } else {
                            console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                        }

                    } else {
                        console.error('Ошибка при начислении монет:', response.data.message);
                    }
                } catch (error) {
                    console.error('Ошибка при добавлении монет:', error);
                }
            }
        });
    }
  }, [tonConnectUI, telegramId]);

  return (
    <TonConnectUIProvider manifestUrl="http://anytap.org/tonconnect-manifest.json">
      <div className='questItem'>
          <div className='questItemLeft'>
              <div className='questIcon'>
                  <img src={wallet} alt=""/>
              </div>
              <div className='questItemLeftContent'>
                  <p className='questTitle'>Wallet Connect</p>
                  <p className='questSubtitle'>+500 points</p>
              </div>
          </div>
          <div className='questItemRight'>
              {!Wallet_val &&(<TonConnectButton/>)}
          </div>
      </div>
    </TonConnectUIProvider>
  );
};

export default TonW;

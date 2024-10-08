import React, { useEffect } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider, TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonW = ({ telegramId, wallet }) => {
  const [tonConnectUI] = useTonConnectUI();
  const walletAddress = useTonAddress(); // Используем хук для получения адреса кошелька

  useEffect(() => {
    const saveWalletAddress = async () => {
      if (walletAddress) { // Проверяем наличие адреса
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
               

                // Отправляем запрос на сервер для добавления 500 монет пользователю
                // try {
                //     const response = await axios.post('https://anypatbackend-production.up.railway.app/wallet-connected', { telegramId });
                //     if (response.data.success) {
                //         console.log('500 монет добавлено пользователю');

                //         // Теперь отправляем запрос на обновление монет у реферера
                //         const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 500 });
                //         if (referralUpdateResponse.data.success) {
                //             console.log('Монеты реферера обновлены');
                //         } else {
                //             console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                //         }

                //     } else {
                //         console.error('Ошибка при начислении монет:', response.data.message);
                //     }
                // } catch (error) {
                //     console.error('Ошибка при добавлении монет:', error);
                // }
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

import React, {useEffect} from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const WeeklyNft = ({WeeklyNft_val, arrows, telegramId}) => {
    const [tonConnectUI] = useTonConnectUI();

    const GoWeekNft = async () => {
        const walletInfo = tonConnectUI.walletInfo;
        if (!walletInfo) { // Если кошелек не подключен
            alert("First ‘Connect Wallet’ to you can call ‘Mint’ function");
            return; // Останавливаем выполнение функции
          }
        try {
            const transaction = {
                validUntil: Date.now() + 5 * 60 * 1000,
                messages: [
                    {
                        address: 'EQD6in8HLyn7iiBfiQuSZflJuP4Fyjs06sPtI5tyM8HxRgtC',
                        amount: '750000000', // 0.75 TON в нанотонах
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);

            await axios.post('https://anypatbackend-production.up.railway.app/update-weekly-nft-val', { telegramId });
    
            // Обновляем локальное хранилище
            localStorage.setItem('WeeklyNft_val', 'true');
            window.dispatchEvent(new Event('storage'));
            try {
                await axios.post('https://anypatbackend-production.up.railway.app/mint-weekly-nft', { telegramId });
                console.log('2500 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
             // Теперь отправляем запрос на обновление монет у реферера
             const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 2500 });
             if (referralUpdateResponse.data.success) {
                 console.log('Монеты реферера обновлены');
             } else {
                 console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
             }
            alert('Transaction sent successfully!');
            localStorage.setItem('WeeklyNft_val', 'true');
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    useEffect(() => {
        const fetchWeeklyNft = async () => {
            try {
                const response = await axios.get(`https://anypatbackend-production.up.railway.app/get-weekly-nft-val?telegramId=${telegramId}`);
                const { WeeklyNft_val } = response.data;

                // Сохраняем значение TonTran_val в localStorage
                localStorage.setItem('WeeklyNft_val', WeeklyNft_val ? 'true' : 'false');
                window.dispatchEvent(new Event('storage')); // Обновляем состояние в React
            } catch (error) {
                console.error('Ошибка при получении WeeklyNft_val из базы данных:', error);
            }
        };

        fetchWeeklyNft();
    }, [telegramId]);

  return (
    <TonConnectUIProvider manifestUrl="https://anytap.org/tonconnect-manifest.json">
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={arrows} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Mint Weekly NFT</p>
                <p className='questSubtitle'>+2500 Points and Weekly NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!WeeklyNft_val &&(<button className='questBtn' onClick={GoWeekNft}>Mint</button>)}
        </div>
    </div>
    </TonConnectUIProvider>
  );
};

export default WeeklyNft;
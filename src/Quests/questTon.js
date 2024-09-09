import React, {useEffect} from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonTrans = ({TonTran_val, arrows, telegramId}) => {
    const [tonConnectUI] = useTonConnectUI();

    const GoTon = async () => {
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
                        address: 'UQDtzUF991k6365U9fGDgH4RSYly67R9OULpLnvEHMdsEKnr',
                        amount: '1000000000', // 1 TON в нанотонах
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);
            try {
                await axios.post('https://anypatbackend-production.up.railway.app/make-ton-transaction', { telegramId });
                console.log('5000 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
             // Теперь отправляем запрос на обновление монет у реферера
             const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 5000 });
             if (referralUpdateResponse.data.success) {
                 console.log('Монеты реферера обновлены');
             } else {
                 console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
             }
            alert('Transaction sent successfully!');
            localStorage.setItem('TonTran_val', 'true');
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    useEffect(() => {
        const fetchTonTranVal = async () => {
            try {
                const response = await axios.get(`https://anypatbackend-production.up.railway.app/get-ton-tran-val?telegramId=${telegramId}`);
                const { TonTran_val } = response.data;

                // Сохраняем значение TonTran_val в localStorage
                localStorage.setItem('TonTran_val', TonTran_val ? 'true' : 'false');
                window.dispatchEvent(new Event('storage')); // Обновляем состояние в React
            } catch (error) {
                console.error('Ошибка при получении TonTran_val из базы данных:', error);
            }
        };

        fetchTonTranVal();
    }, [telegramId]);

    return (
        <TonConnectUIProvider manifestUrl="https://anytap.org/tonconnect-manifest.json">
            <div className='questItem'>
                <div className='questItemLeft'>
                    <div className='questIcon'>
                        <img src={arrows} alt="" />
                    </div>
                    <div className='questItemLeftContent'>
                        <p className='questTitle'>Make Ton transactions</p>
                        <p className='questSubtitle'>+5000 Points</p>
                    </div>
                </div>
                <div className='questItemRight'>
                    {!TonTran_val && (<button className='questBtn' onClick={GoTon}>GO!</button>)}
                </div>
            </div>
        </TonConnectUIProvider>
    );
};

export default TonTrans;

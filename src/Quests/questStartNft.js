import React from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const MintStartNft = ({ GoStartNft, StartNft_val, setStartNft_val, MintStart, telegramId }) => {
    const [tonConnectUI] = useTonConnectUI();

    GoStartNft = async () => {
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
                        address: 'UQC-ZK_dPpZ15VaL-kwyXT1jTCYDTQricz8RxvXT0VmdbRYG',
                        amount: '1000000', // 1 TON в нанотонах
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);
            alert('Transaction sent successfully!');
            setStartNft_val(true);

            // Отправляем запрос на сервер для добавления 1000 монет
            try {
                await axios.post('https://anypatbackend-production.up.railway.app/mint-start-nft', { telegramId });
                console.log('1000 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    return (
        <TonConnectUIProvider manifestUrl="https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json">
            <div className='questItem'>
                <div className='questItemLeft'>
                    <div className='questIcon'>
                        <img src={MintStart} alt=""/>
                    </div>
                    <div className='questItemLeftContent'>
                        <p className='questTitle'>Mint Start NFT</p>
                        <p className='questSubtitle'>+1000 Points and free NFT</p>
                    </div>
                </div>
                <div className='questItemRight'>
                    {!StartNft_val && (<button className='questBtn' onClick={GoStartNft}>Mint</button>)}
                </div>
            </div>
        </TonConnectUIProvider>
    );
};

export default MintStartNft;

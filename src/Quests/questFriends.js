import React, { useEffect, useState } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const FrendsQuest = ({ Frends_val, invite, telegramId }) => {
    const [tonConnectUI] = useTonConnectUI();
    const [referralCount, setReferralCount] = useState(0);

    useEffect(() => {
        // Функция для получения количества рефералов
        const fetchReferralCount = async () => {
            try {
                const response = await fetch(`https://anypatbackend-production.up.railway.app/user-referrals?telegramId=${telegramId}`);
               

                setReferralCount(response.data.referrals.length);
            } catch (error) {
                console.error('Ошибка при получении количества рефералов:', error);
            }
        };

        fetchReferralCount();
    }, [telegramId]);

    const GoFriendNft = async () => {
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
            try {
                await axios.post('https://anypatbackend-production.up.railway.app/mint-friend-nft', { telegramId });
                console.log('5000 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
            alert('Transaction sent successfully!');
            localStorage.setItem('Frends_val', 'true');
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    const handleMintClick = () => {
        if (referralCount < 5) {
            alert('Вы не можете совершить транзакцию из-за того, что у вас меньше 10 рефералов.');
        } else {
            GoFriendNft();
        }
    };

    return (
        <TonConnectUIProvider manifestUrl="https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json">
            <div className='questItem'>
                <div className='questItemLeft'>
                    <div className='questIcon'>
                        <img src={invite} alt="" />
                    </div>
                    <div className='questItemLeftContent'>
                        <p className='questTitle'>Invite 10 friends</p>
                        <p className='questSubtitle'>+5000 Points and Referral NFT</p>
                    </div>
                </div>
                <div className='questItemRight'>
                    {!Frends_val && (
                        <button className='questBtn' onClick={handleMintClick}>
                            Mint
                        </button>
                    )}
                </div>
            </div>
        </TonConnectUIProvider>
    );
};

export default FrendsQuest;
import React, { useEffect, useState } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const FrendsQuest = ({ Frends_val, invite, telegramId, referralsCount }) => {
    const [tonConnectUI] = useTonConnectUI();
    const [isEligible, setIsEligible] = useState(false);

    useEffect(() => {
        if (referralsCount >= 9) {
            setIsEligible(true);
        } else {
            setIsEligible(false);
        }
    }, [referralsCount]);

    const GoFriendNft = async () => {
        if (!isEligible) {
            alert('You can not mint yet! You need to invite 10 friends first');
            return; 
        }

        const walletInfo = tonConnectUI.walletInfo;
        if (!walletInfo) { 
            alert("First ‘Connect Wallet’ to you can call ‘Mint’ function");
            return; 
        }
        try {
            const transaction = {
                validUntil: Date.now() + 5 * 60 * 1000,
                messages: [
                    {
                        address: 'EQACWu9QvWiu_T1YFrLTZBhm7QPtUUf45RVK_lH-iCmvoo-J',
                        amount: '10000000',
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);

            await axios.post('https://anypatbackend-production.up.railway.app/update-friend-nft-val', { telegramId });
    
            localStorage.setItem('Frends_val', 'true');
            window.dispatchEvent(new Event('storage'));
    
            alert('Transaction sent successfully!');

            try {
                await axios.post('https://anypatbackend-production.up.railway.app/mint-friend-nft', { telegramId });
                console.log('5000 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
             const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 5000 });
             if (referralUpdateResponse.data.success) {
                 console.log('Монеты реферера обновлены');
             } else {
                 console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
             }
            alert('Transaction sent successfully!');
            localStorage.setItem('Frends_val', 'true');
            window.dispatchEvent(new Event('storage'));

        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    useEffect(() => {
        const fetchFriendNftVal = async () => {
            try {
                const response = await axios.get(`https://anypatbackend-production.up.railway.app/get-friend-nft-val?telegramId=${telegramId}`);
                const { Frends_val } = response.data;

                localStorage.setItem('Frends_val', Frends_val ? 'true' : 'false');
                window.dispatchEvent(new Event('storage')); 
            } catch (error) {
                console.error('Ошибка при получении Frends_val из базы данных:', error);
            }
        };

        fetchFriendNftVal();
    }, [telegramId]);

    return (
        <TonConnectUIProvider manifestUrl="https://anytap.org/tonconnect-manifest.json">
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
                        <button className='questBtn' onClick={GoFriendNft}>
                            Mint
                        </button>
                    )}
                </div>
            </div>
        </TonConnectUIProvider>
    );
};

export default FrendsQuest;

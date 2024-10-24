import React from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const MintStartNft = ({ StartNft_val, MintStart, telegramId}) => {
    const [tonConnectUI] = useTonConnectUI();
   
    const GoStartNft = async () => {
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
                        address: 'EQCHDYSdSCwGrWyQsIHRqdFg1z2HPHPfyK6QdyPkpAmGmvd4',
                        amount: '3000000000', 
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);
            alert('Transaction sent successfully!');
             const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 10000 });
             if (referralUpdateResponse.data.success) {
                 console.log('Монеты реферера обновлены');
             } else {
                 console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
             }
            try {
                await axios.post('https://anypatbackend-production.up.railway.app/mint-start-nft', { telegramId });
                console.log('1000 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
            alert('Transaction sent successfully!');
            localStorage.setItem('StartNft_val', 'true');
            window.dispatchEvent(new Event('storage'));
            await axios.post('https://anypatbackend-production.up.railway.app/update-startnft-val', {
                telegramId,
                StartNft_val: true
            });
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };


  return (
    <TonConnectUIProvider manifestUrl="https://anytap.org/tonconnect-manifest.json">
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={MintStart} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Mint Start NFT</p>
                <p className='questSubtitle'>+10000 Points and free NFT</p>
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
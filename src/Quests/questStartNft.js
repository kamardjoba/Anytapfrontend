import React from 'react';
import '../Css/Quests.css';
import MintStart from'../IMG/mint.svg';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';

const MintStartNft = ({GoStartNft, StartNft_val, setStartNft_val}) => {
    const [tonConnectUI] = useTonConnectUI();

    GoStartNft = async () => {
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
            setStartNft_val(true);  // Устанавливаем TonTran_val в true
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
import React from 'react';
import diamond from '../IMG/diamond.png';
import '../Css/NoFriends.css';

function NoFriends({invite, MintStart, referralLink}) {

    const handleShareLink = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Присоединяйся к нашему приложению и получай бонусы!')}`;
        window.open(telegramUrl, '_blank');
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    };

    return (
        <div className='startpageContainer'>
            <div className='startpageWrapper' id='noFriendsWrapper'>
                <div className='diamondImgWrapper'>
                    <img src={diamond} alt="" className='diamondImg'/>
                </div>
                <div className='inviteFriendsWrapper'>
                    <div className='inviteFriendsItem'>
                        <img src={invite} alt=""/>
                        <p className='inviteFriendsText'>Get 10% of your friends’ points!</p>
                    </div>

                    <div className='inviteFriendsItem'>
                        <img src={MintStart} alt=""/>
                        <p className='inviteFriendsText'>Invite 10 friends and receive a unique NFT!</p>
                    </div>
                </div>
                <button className='connectBtn' onClick={handleShareLink}>Link</button>
            </div>
        </div>
    );
}

export default NoFriends;
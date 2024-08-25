import React from 'react';
import '../Css/Friends.css';
import copy from '../IMG/copy.svg';
import small_diam from "../IMG/small_diam.png";

function Friends({ userPhoto, referralLink, referrals, invite, MintStart}) {

    const handleCopyClick = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink)
                .then(() => {
                    console.log('Реферальная ссылка скопирована:', referralLink);
                    alert('Реферальная ссылка скопирована в буфер обмена!');
                })
                .catch(err => {
                    console.error('Ошибка при копировании реферальной ссылки:', err);
                    alert('Не удалось скопировать реферальную ссылку.');
                });
        }
    };

    const handleShareLink = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Присоединяйся к нашему приложению и получай бонусы!')}`;
        window.open(telegramUrl, '_blank');
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    };

    return (
        <div className='friendsPage'>
            <div className='whiteContainerQuest friendsItems'>
                <div className='friendsItem'>
                    <img src={invite} alt="" />
                    <p className='friendsItemText'>Get 10% of your friends’ points!</p>
                </div>
                <div className='friendsItem'>
                    <img src={MintStart} alt="" />
                    <p className='friendsItemText'>Invite 10 friends and receive a unique NFT!</p>
                </div>
                <div className='linkCopyWrapper'>
                    <button className='linkBtn' onClick = {handleShareLink}>Link</button>
                    <button className='copyBtn' onClick={handleCopyClick}>
                        <img src={copy} alt="" />
                    </button>
                </div>
            </div>

            <div className='friendsUsers'>
                <ul className='whiteContainerContent leaderboardScroll'>
                    {referrals.map((referral, index) => (
                        <li className='leaderboardItem' key={index}>
                            <div className='leaderboardItemLeft'>
                                <div className='leaderboardAvatar'>
                                    <img
                                        src={referral.photoUrl ? referral.photoUrl : userPhoto}
                                        alt="referral avatar"
                                        className='leaderboardAvatarImg'
                                    />
                                </div>

                                <div>
                                    <p className='leaderboardTitle'>{referral.nickname || 'no_name'}</p>
                                    <p className='leaderboardSubtitle'>
                                        {referral.coins !== undefined ? referral.coins.toLocaleString() : 'N/A'}
                                        <img src={small_diam} alt="" />
                                    </p>
                                </div>
                            </div>
                            <div className='leaderboardItemRight'>
                                <p>
                                    {referral.coins !== undefined ? referral.coins : 'N/A'}
                                    <img src={small_diam} alt="" />
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Friends;

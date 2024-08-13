import React, { useEffect, useState } from 'react';
import './../../App.css';
import inv_fr1 from './../../images/inv_fr1.svg';
import inv_fr2 from './../../images/inv_fr2.svg';
import copy from './../../images/copy.svg';
import avatar from "../../images/avatar.png";
import small_diam from "../../images/small_diam.png";

function Friends({ telegramId }) {
    const [referredUsers, setReferredUsers] = useState([]);
    const backendUrl = 'https://anypatbackend-production.up.railway.app'; // Замените на реальный URL вашего бэкенда

    useEffect(() => {
        if (telegramId) {
            fetch(`${backendUrl}/api/user/${telegramId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.referredUsers) {
                        setReferredUsers(data.referredUsers);
                    }
                })
                .catch(error => console.error('Ошибка при загрузке данных пользователя:', error));
        }
    }, [telegramId]);

    return (
        <div className='friendsPage'>
            <div className='friendsContainer'>
                <div className='whiteContainerQuest friendsItems'>
                    <div className='friendsItem'>
                        <img src={inv_fr1} alt=""/>
                        <p className='friendsItemText'>Get 10% of your friends’ points!</p>
                    </div>
                    <div className='friendsItem'>
                        <img src={inv_fr2} alt=""/>
                        <p className='friendsItemText'>Invite 10 friends and receive a unique NFT!</p>
                    </div>
                    <div className='linkCopyWrapper'>
                        <button className='linkBtn'>Link</button>
                        <button className='copyBtn'><img src={copy} alt=""/></button>
                    </div>
                </div>

                <div className='friendsUsers'>
                    <ul className='whiteContainerContent leaderboardScroll '>
                        {referredUsers.length > 0 ? referredUsers.map((user, index) => (
                            <li key={index} className='leaderboardItem'>
                                <div className='leaderboardItemLeft'>
                                    <div className='leaderboardAvatar'>
                                        <img src={avatar} alt="" className='leaderboardAvatarImg'/>
                                    </div>
                                    <div>
                                        <p className='leaderboardTitle'>{user.nickname}</p>
                                        <p className='leaderboardSubtitle'>{user.earnedCoins} coins earned</p>
                                    </div>
                                </div>
                                <div className='leaderboardItemRight'>
                                    {user.earnedCoins}<img src={small_diam} alt="" className=''/>
                                </div>
                            </li>
                        )) : (
                            <li className='leaderboardItem'>
                                <p>No referred users yet.</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Friends;

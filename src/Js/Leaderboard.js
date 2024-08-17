import React, { useEffect, useState } from 'react';
import '../Css/Leaderboard.css';
import small_diam from '../IMG/small_diam.png';
import avatar from '../IMG/avatar.png';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Функция для получения данных с сервера
        const fetchData = async () => {
            try {
                const response = await fetch('https://anypatbackend-production.up.railway.app/leaderboard');
                const data = await response.json();
                setLeaderboardData(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных лидерборда:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='leaderboardContainer'>
            <div className='blueContainer'>
                <div className='blueContainerItem'>
                    <p className='blueContainerItemTitle'>#1</p>
                    <p className='blueContainerItemSubtitle'>Your rank</p>
                </div>
                <div className='blueContainerItem'>
                    <p className='blueContainerItemTitle'>60.8K</p>
                    <p className='blueContainerItemSubtitle'>Your points</p>
                </div>
            </div>
            <div className='whiteContainerLeaderboard'>
                <ul className='whiteContainerContent leaderboardScroll'>
                    {leaderboardData.map((user, index) => (
                        <li className='leaderboardItem' key={user.telegramId}>
                            <div className='leaderboardItemLeft'>
                                <div className='leaderboardAvatar'>
                                    <img src={user.photoUrl || avatar} alt="" className='leaderboardAvatarImg' />
                                </div>
                                <div>
                                    <p className='leaderboardTitle'>{user.nickname || 'no_name'}</p>
                                    <p className='leaderboardSubtitle'>{user.coins.toLocaleString()} <img src={small_diam} alt=""/></p>
                                </div>
                            </div>
                            <div className='leaderboardItemRight'>
                                {index + 1}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Leaderboard;

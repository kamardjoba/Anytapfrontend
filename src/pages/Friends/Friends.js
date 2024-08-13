import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Friends(props) {
    const [referredUsers, setReferredUsers] = useState([]);

    useEffect(() => {
        const fetchReferredUsers = async () => {
            try {
                const response = await axios.post('/get-referred-users', { referralCode: props.referralCode });
                setReferredUsers(response.data.referredUsers);
            } catch (error) {
                console.error('Ошибка при получении данных о рефералах:', error);
            }
        };

        fetchReferredUsers();
    }, [props.referralCode]);

    return (
        <div className='friendsPage'>
            {/* Отображение списка друзей */}
            {referredUsers.map((user, index) => (
                <div key={index} className='leaderboardItem'>
                    <p>{user.nickname}</p>
                    <p>{user.earnedCoins} $OCTIES</p>
                </div>
            ))}
        </div>
    );
}

export default Friends;

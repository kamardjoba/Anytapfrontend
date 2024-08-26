import React, { useState, useEffect } from 'react';
import '../Css/HomePage.css';
import diamond from '../IMG/diamond.png';

function HomePage(props) {
    const [userCoins, setUserCoins] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const telegramId = urlParams.get('telegramId');

        if (telegramId) {
            fetch(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setUserCoins(data.coins);
                    } else {
                        console.error('Failed to fetch user coins:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, []);

    return (
        <div className='homepageContainer'>
            <div className='homepageWrapper'>
                <p className='welcomeText'>Welcome to <br/>Anytap!</p>
                <div className='amountWrapper'>
                    <p className='amount'>{userCoins !== null ? userCoins : 'Loading...'}</p>
                    <img src={diamond} alt="" className='diamondImgHomepage' onClick={() => localStorage.clear()} />
                </div>
                <p className='homepageDescr'>
                    Earn points, mint NFTs, <br/>and receive valuable <br/>  rewards for your activity!
                </p>
            </div>
        </div>
    );
}

export default HomePage;

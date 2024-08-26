import React from 'react';
import '../Css/HomePage.css';
import diamond from '../IMG/diamond.png';
const [userCoins, setUserCoins] = useState(null);

function HomePage(props) {

    const telegramId = urlParams.get('telegramId');
    if (telegramId) {
        fetch(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUserCoins = data.coins;
                    setLoading(false);
                } else {
                    console.error('Ошибка при получении данных о пользователе:', data.message);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Ошибка при запросе:', error);
                setLoading(false);
            });
    }

    return (
        <div className='homepageContainer'>
            <div className='homepageWrapper'>
                <p className='welcomeText'>Welcome to <br/>Anytap!</p>
                <div className='amountWrapper'>
                    <p className='amount'>{coins}</p>
                    <img src={diamond} alt="" className='diamondImgHomepage'  onClick={(event) => {localStorage.clear();}}/>
                </div>
                <p className='homepageDescr'>
                    Earn points, mint NFTs, <br/>and receive valuable <br/>  rewards for your activity!
                </p>
            </div>
        </div>
    );
}

export default HomePage;
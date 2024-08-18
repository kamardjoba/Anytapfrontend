import React, { useEffect, useState } from 'react';
import '../Css/App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import home from '../IMG/footerLogo/HM.png';
import leaderboard from '../IMG/footerLogo/LB.png';
import quests from '../IMG/footerLogo/QE.png';
import friends from '../IMG/footerLogo/FR.png';
import HomePage from "./HomePage";
import Leaderboard from "./Leaderboard";
import NoFriends from "./NoFriends";
import Friends from "./Friends";
import Quests from "./Quests";
import nophoto from '../IMG/noprofilephoto.png';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        coins: 0,
        photoUrl: ''
    });
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const telegramId = urlParams.get('telegramId');

        if (telegramId) {
            fetch(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setUserInfo({
                            firstName: data.firstName,
                            coins: data.coins,
                            photoUrl: data.photoUrl
                        });
                    } else {
                        console.error('Ошибка при получении данных о пользователе:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при запросе:', error);
                });
            }
            if (location.pathname === "/") {
                navigate("/home");
                setActiveItem(0); 
            }
    }, [navigate, location]);

    const handleNavigation = (path, index) => {
        navigate(path);
        setActiveItem(index);
    };

    return (
        <div className='appWrapper'>
            <header className='headerWrapper'>
                <p className='userName'>{userInfo.firstName}</p>
                <div className='userAvatarWrapper'>
                    <img className='userAvatarImg' src={userInfo.photoUrl || nophoto} alt="userAvatar" />
                </div>
            </header>
            <div className='centeredBlock'>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/nofriends" element={<NoFriends />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/quests" element={<Quests />} />
                </Routes>
            </div>

            <footer className='footer'>
                <ul className='footerItems'>
                    <li className={`footerItem ${activeItem === 0 ? 'active' : ''}`} onClick={() => handleNavigation('/home', 0)}>
                        <div className='footerItemImgWrapper'>
                            <img src={home} alt="home" className='footerItemImg' />
                        </div>
                        <p className='footerItemLabel'>Home</p>
                    </li>
                    <li className={`footerItem ${activeItem === 1 ? 'active' : ''}`} onClick={() => handleNavigation('/leaderboard', 1)}>
                        <div className='footerItemImgWrapper'>
                            <img src={leaderboard} alt="leaderboard" className='footerItemImg' />
                        </div>
                        <p className='footerItemLabel'>Leaderboard</p>
                    </li>
                    <li className={`footerItem ${activeItem === 2 ? 'active' : ''}`} onClick={() => handleNavigation('/quests', 2)}>
                        <div className='footerItemImgWrapper'>
                            <img src={quests} alt="quests" className='footerItemImg' />
                        </div>
                        <p className='footerItemLabel'>Quests</p>
                    </li>
                    <li className={`footerItem ${activeItem === 3 ? 'active' : ''}`} onClick={() => handleNavigation('/friends', 3)}>
                        <div className='footerItemImgWrapper'>
                            <img src={friends} alt="friends" className='footerItemImg' />
                        </div>
                        <p className='footerItemLabel'>Friends</p>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import '../Css/Quests.css';
import axios from 'axios';
import TgQuest from '../Quests/questTg';
import TgOctiesQuest from '../Quests/questOctiesTg';
import XQuest from '../Quests/questX';
import MintStartNft from '../Quests/questStartNft';
import FrendsQuest from '../Quests/questFriends';
import WeeklyNft from '../Quests/questWeeklyNft';
import TonTrans from '../Quests/questTon';
import TonW from '../Quests/questTonWallet';
import InstQuest from '../Quests/questInst';


function Quests({userInfo, X, arrows, invite, MintStart, wallet, inst, telegram}) {
    const [VisiblaBasedTask, setVisiblaBasedTask] = useState(true);
    const [VisiblaWeekTask, setVisiblaWeekTask] = useState(true);
    const [VisiblaComplatedTask, setVisiblaComplatedTask] = useState(false);

    if (!localStorage.getItem('TgChanel_val')) {localStorage.setItem('TgChanel_val', 'false');}
    const TgChanel_val = localStorage.getItem('TgChanel_val') === 'true';

    if (!localStorage.getItem('TgOcties_val')) {localStorage.setItem('TgOcties_val', 'false');}
    const TgOcties_val = localStorage.getItem('TgOcties_val') === 'true';

    if (!localStorage.getItem('X_val')) {localStorage.setItem('X_val', 'false');}
    const X_val = localStorage.getItem('X_val') === 'true';

    if (!localStorage.getItem('Inst_val')) {localStorage.setItem('Inst_val', 'false');}
    const Inst_val = localStorage.getItem('Inst_val') === 'true';

    
    const [StartNft_val, setStartNft_val] = useState(false);
    const [Frends_val, setFrends_val] = useState(false);
    const [WeeklyNft_val, setWeeklyNft_val] = useState(false);
    const [TonTran_val, setTonTran_val] = useState(false);
    const [Wallet_val, setWallet_val] = useState(false);

  
      

    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            const user = window.Telegram.WebApp.initDataUnsafe.user;
    
            if (user) {
                const telegramId = user.id;
                const checkSubscription = async () => {
                    try {
                        const response = await axios.post('https://anypatbackend-production.up.railway.app/check-subscription', { telegramId });
                        if (response.data.success && response.data.isSubscribedToChannel) {
                            localStorage.setItem('TgChanel_val', 'true');
                        }
                        if (response.data.success && response.data.isSubscribedToOctiesChannel) {
                            localStorage.setItem('TgOcties_val', 'true');
                        }
                        if (response.data.isSubscribedToTwitter) {
                            localStorage.setItem('X_val', 'true');
                        }
                        if (response.data.isSubscribedToInstagram) {
                            localStorage.setItem('Inst_val', 'true');
                        }
                    } catch (error) {
                        console.error('Ошибка при проверке подписки:', error);
                    }
                };

                checkSubscription();
            } else {
                console.error('Не удалось получить данные пользователя из WebApp');
            }
        } else {
            console.error('Telegram WebApp API не доступен');
        }
    }, []);
    

    function GoInst() {
        window.open('https://www.instagram.com/anytap_dapps?igsh=MW1oaHNxYXR5eWxrOA%3D%3D&utm_source=qr', '_blank'); // Замените на ссылку на ваш Twitter
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
    
            if (user) {
                const telegramId = user.id;
    
                // Устанавливаем таймер на 5 секунд
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-instagram-subscription', { telegramId });
                        localStorage.setItem('Inst_val', 'true'); // Обновляем состояние в React после успешного запроса
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                }, 5000); // 5000 миллисекунд = 5 секунд
            }
        }
    }
    
    

    function GoWallet() {
        setWallet_val(true);
    }
    

    function GoTg() {
        window.open('https://t.me/any_tap', '_blank');
    }

    function GoOct() {
        window.open('https://t.me/octies_channel', '_blank');
    }

    function GoX() {
        window.open('https://x.com/anytap_dapps?s=21', '_blank'); // Замените на ссылку на ваш Twitter
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
    
            if (user) {
                const telegramId = user.id;
    
                // Устанавливаем таймер на 5 секунд
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-twitter-subscription', { telegramId });
                        localStorage.setItem('X_val', 'true'); // Обновляем состояние в React после успешного запроса
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                }, 5000); // 5000 миллисекунд = 5 секунд
            }
        }
    }
    
    function GoStartNft() {
        setStartNft_val(true);
    }

    function GoFrands() {
        setFrends_val(true);
    }

    function GoWeekNft() {
        setWeeklyNft_val(true);
    }
    
    function GoTon() {
        setTonTran_val(true);
    }

    useEffect(() => {
        if (TgChanel_val ||
            TgOcties_val || 
            X_val ||
            StartNft_val || 
            Frends_val ||
            Wallet_val || 
            WeeklyNft_val || 
            TonTran_val) 
            {setVisiblaComplatedTask(true);}}, 
            [TgChanel_val, 
            TgOcties_val, 
            X_val, 
            StartNft_val, 
            Frends_val, 
            Wallet_val, 
            TonTran_val, 
            WeeklyNft_val]);


    useEffect(() => {
        if (TgChanel_val && TgOcties_val && X_val && StartNft_val && Frends_val && Wallet_val) {
            setVisiblaBasedTask(false);
        }
    }, [TgChanel_val, TgOcties_val, X_val, StartNft_val, Frends_val, Wallet_val]);

    useEffect(() => {
        if (WeeklyNft_val && TonTran_val) {
            setVisiblaWeekTask(false);
        }
    }, [WeeklyNft_val, TonTran_val]);



    return (
        <div className='questsPage'>
            {VisiblaBasedTask && <div className='basedtask'>
                <div className='txtNf'>
                    <p>Based task</p>
                </div>
                {!Wallet_val && <TonW GoWallet={GoWallet} setWallet_val={setWallet_val} wallet={wallet}/>}
                {!TgChanel_val && <TgQuest GoTg={GoTg} telegram={telegram} />}
                {!TgOcties_val && <TgOctiesQuest GoOct={GoOct} telegram={telegram}/>}
                {!X_val && <XQuest GoX={GoX} X={X}/>}
                {!Inst_val && <InstQuest GoInst={GoInst} inst={inst}/>}
                {!StartNft_val && <MintStartNft GoStartNft={GoStartNft} StartNft_val={StartNft_val} setStartNft_val={setStartNft_val} MintStart={MintStart} telegramId={userInfo.telegramId}/>}
                {!Frends_val && <FrendsQuest GoFrands={GoFrands} invite={invite}/>}
            </div>}

            {VisiblaWeekTask &&<div className='basedtask'>
                <div className='txtNf'>
                    <p>Weekly task</p>
                </div>
                {!WeeklyNft_val && <WeeklyNft GoWeekNft={GoWeekNft} WeeklyNft_val = {WeeklyNft_val} setWeeklyNft_val={setWeeklyNft_val} arrows={arrows}/>}
                {!TonTran_val && <TonTrans GoTon={GoTon} TonTran_val={TonTran_val} setTonTranVal={setTonTran_val}  arrows={arrows} />}

               
            </div>}

            {VisiblaComplatedTask && <div id='complatedtask'>
                <div className='txtNf'>
                    <p>Complеted task</p>
                </div>
                {Wallet_val && <TonW Wallet_val={Wallet_val} setWallet_val={setWallet_val} wallet={wallet} telegramId={userInfo.telegramId} />}
                {TgChanel_val && <TgQuest TgChanel_val={TgChanel_val} telegram={telegram}/>}
                {TgOcties_val && <TgOctiesQuest TgOcties_val={TgOcties_val} telegram={telegram}/>}
                {X_val && <XQuest X_val={X_val} X={X} />}
                {StartNft_val && <MintStartNft StartNft_val={StartNft_val} MintStart={MintStart} telegramId={userInfo.telegramId}/>}
                {Frends_val && <FrendsQuest Frends_val={Frends_val} invite={invite}/>}
                {WeeklyNft_val && <WeeklyNft WeeklyNft_val={WeeklyNft_val} setWeeklyNft_val={setWeeklyNft_val} arrows={arrows} />}
                {TonTran_val && <TonTrans GoTon={GoTon} TonTran_val={TonTran_val} setTonTranVal={setTonTran_val} arrows={arrows} />}
                {Inst_val && <InstQuest Inst_val={Inst_val} inst={inst}/>}
            </div>}
        </div>
    );
}

export default Quests;

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


function Quests({ X, arrows, invite, MintStart, wallet, inst, telegram,
    TgChanel_val,  TgOcties_val,  X_val,StartNft_val, Frends_val, WeeklyNft_val, TonTran_val, Inst_val, 
    VisiblaBasedTask, VisiblaWeekTask,VisiblaComplatedTask,referralsCount
}) {

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
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('TgChanel_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.success && response.data.isSubscribedToOctiesChannel) {
                            localStorage.setItem('TgOcties_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('TgOcties_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToTwitter) {
                            localStorage.setItem('X_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToInstagram) {
                            localStorage.setItem('Inst_val', 'true');
                            window.dispatchEvent(new Event('storage'));
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
                        localStorage.setItem('Inst_val', 'true'); 
                        window.dispatchEvent(new Event('storage'));// Обновляем состояние в React после успешного запроса
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     // Теперь отправляем запрос на обновление монет у реферера
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); // 5000 миллисекунд = 5 секунд
            }
        }
    }

    function GoX() {
        window.open('https://x.com/anytap_dapps?s=21', '_blank'); 
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                const telegramId = user.id;
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-twitter-subscription', { telegramId });
                        localStorage.setItem('X_val', 'true'); 
                        window.dispatchEvent(new Event('storage'));
                        
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     // Теперь отправляем запрос на обновление монет у реферера
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); 
            }
        }
    }


    function GoTg() {
        window.open('https://t.me/any_tap', '_blank');
        
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
        
            if (user) {
                const telegramId = user.id;
    
                // Create an interval that checks the subscription every 5 seconds
                const intervalId = setInterval(async () => {
                    try {
                        const response = await axios.post('https://anypatbackend-production.up.railway.app/check-subscription', { telegramId });
    
                        if (response.data.success && response.data.isSubscribedToChannel) {
                            localStorage.setItem('TgChanel_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                            
                            try {
                                const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                                if (referralUpdateResponse.data.success) {
                                    console.log('Монеты реферера обновлены');
                                    clearInterval(intervalId); // Stop the interval when success
                                } else {
                                    console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                                }
                            } catch (error) {
                                console.error('Ошибка при вызове add-coins-to-referral:', error);
                            }
                        } else {
                            localStorage.setItem('TgChanel_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                    } catch (error) {
                        console.error('Ошибка при проверке подписки:', error);
                        localStorage.setItem('TgChanel_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                    }
                }, 5000); // Check subscription every 5 seconds
            }
        }
    }
    
    function GoOct() {
        window.open('https://t.me/octies_community', '_blank');
        
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
        
            if (user) {
                const telegramId = user.id;
    
                // Create an interval that checks the subscription every 5 seconds
                const intervalId = setInterval(async () => {
                    try {
                        const response = await axios.post('https://anypatbackend-production.up.railway.app/check-subscription', { telegramId });
    
                        if (response.data.success && response.data.isSubscribedToOctiesChannel) {
                            localStorage.setItem('TgOcties_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                            
                            try {
                                const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                                if (referralUpdateResponse.data.success) {
                                    console.log('Монеты реферера обновлены');
                                    clearInterval(intervalId); // Stop the interval when success
                                } else {
                                    console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                                }
                            } catch (error) {
                                console.error('Ошибка при вызове add-coins-to-referral:', error);
                            }
                        } else {
                            localStorage.setItem('TgOcties_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                    } catch (error) {
                        console.error('Ошибка при проверке подписки:', error);
                        localStorage.setItem('TgOcties_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                    }
                }, 5000); // Check subscription every 5 seconds
            }
        }
    }
    
    
    

 

    const [telegramId, setTelegramId] = useState(null);

    useEffect(() => {
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setTelegramId(user.id);
            } else {
                console.error('Не удалось получить Telegram ID');
            }
        }
    }, []);


    return (
        <div className='questsPage'>

            <div className='basedtask'>
                <TonW wallet={wallet} telegramId={telegramId} />
            </div>
            {VisiblaBasedTask && <div className='basedtask'>
                <div className='txtNf'>
                    <p>Based task</p>
                </div>
                
                {!TgChanel_val && <TgQuest GoTg={GoTg} telegram={telegram} />}
                {!TgOcties_val && <TgOctiesQuest GoOct={GoOct} telegram={telegram}/>}
                {!X_val && <XQuest GoX={GoX} X={X}/>}
                {!Inst_val && <InstQuest GoInst={GoInst} inst={inst}/>}
                {!StartNft_val && <MintStartNft  StartNft_val={StartNft_val}  MintStart={MintStart} telegramId={telegramId}/>}
                {!Frends_val && <FrendsQuest telegramId={telegramId} invite={invite} referralsCount={referralsCount} />}
            </div>}

            {VisiblaWeekTask &&<div className='basedtask'>
                <div className='txtNf'>
                    <p>Weekly task</p>
                </div>
                {!WeeklyNft_val && <WeeklyNft WeeklyNft_val = {WeeklyNft_val} telegramId={telegramId} arrows={arrows}/>}
                {!TonTran_val && <TonTrans TonTran_val={TonTran_val} telegramId={telegramId} arrows={arrows} />}     
            </div>}

            {VisiblaComplatedTask && <div id='complatedtask'>
                <div className='txtNf'>
                    <p>Complеted task</p>
                </div>
                {TgChanel_val && <TgQuest TgChanel_val={TgChanel_val} telegram={telegram}/>}
                {TgOcties_val && <TgOctiesQuest TgOcties_val={TgOcties_val} telegram={telegram}/>}
                {X_val && <XQuest X_val={X_val} X={X} />}
                {StartNft_val && <MintStartNft StartNft_val={StartNft_val} MintStart={MintStart} telegramId={telegramId}/>}
                {Frends_val && <FrendsQuest Frends_val={Frends_val} telegramId={telegramId} invite={invite} referralsCount={referralsCount} />}
                {WeeklyNft_val && <WeeklyNft WeeklyNft_val={WeeklyNft_val} telegramId={telegramId} arrows={arrows} />}
                {TonTran_val && <TonTrans TonTran_val={TonTran_val} telegramId={telegramId} arrows={arrows} />}
                {Inst_val && <InstQuest Inst_val={Inst_val} inst={inst}/>}
            </div>}
        </div>
    );
}

export default Quests;
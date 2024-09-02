// src/Quests/AdsGramTask.js
import React from 'react';
import '../Css/Quests.css';

const AdsGramTask = ({Ad, telegramId}) => {
    const showAd = () => {
        if (window.AdsGram) {
            window.AdsGram.AdController.show({
                onAdClosed: async () => {
                    console.log("Реклама закрыта");

                    try {
                        // Обновляем монеты у пользователя
                        const response = await fetch('https://anypatbackend-production.up.railway.app/add-coins', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ telegramId, amount: 200 }),
                        });

                        const data = await response.json();
                        if (data.success) {
                            console.log('200 монет успешно добавлены пользователю');
                        } else {
                            console.error('Ошибка при добавлении монет пользователю:', data.message);
                        }

                        // Теперь обновляем монеты у реферера
                        const referralUpdateResponse = await fetch('https://anypatbackend-production.up.railway.app/add-coins-to-referral', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ telegramId, amount: 200 }),
                        });

                        const referralData = await referralUpdateResponse.json();
                        if (referralData.success) {
                            console.log('Монеты реферера успешно обновлены');
                        } else {
                            console.error('Ошибка при обновлении монет реферера:', referralData.message);
                        }

                    } catch (error) {
                        console.error('Ошибка при обновлении монет:', error);
                    }
                },
            });
        }
    };


    return (
        <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={Ad} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Watch some interesting </p>
                <p className='questSubtitle'>+200 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {(<button className='questBtn' onClick={showAd}>Watch!</button>)}
        </div>
    </div>
    );
};

export default AdsGramTask;
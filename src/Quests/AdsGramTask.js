import React, { useEffect, useRef } from 'react';
import '../Css/Quests.css';

const AdsGramTask = ({ Ad, telegramId }) => {
    const AdControllerRef = useRef(null);

    // Инициализация AdsGram SDK при первом рендере
    useEffect(() => {
        if (window.Adsgram) {
            AdControllerRef.current = window.Adsgram.init({
                blockId: "2682", // замените на ваш реальный blockId
                debug: true, // отключите в продакшене
                debugBannerType: "FullscreenMedia" // тип тестового баннера, если debug включен
            });
        }
    }, []); // пустой массив зависимостей для выполнения только один раз

    const showAd = () => {
        if (AdControllerRef.current) {
            AdControllerRef.current.show()
                .then(async (result) => {
                    if (result.done) {
                        console.log('Пользователь досмотрел рекламу до конца');
                        
                        // Добавляем монеты пользователю
                        try {
                            const response = await fetch('https://anypatbackend-production.up.railway.app/add-coins', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ telegramId, amount: 5 }),
                            });
    
                            const data = await response.json();
                            if (data.success) {
                                console.log('200 монет успешно добавлены пользователю');
                            } else {
                                console.error('Ошибка при добавлении монет пользователю:', data.message);
                            }
                        } catch (error) {
                            console.error('Ошибка при выполнении запроса на добавление монет:', error);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при показе рекламы:', error);
                });
        } else {
            console.error('AdsGram SDK не загружен');
        }
    };

    return (
        <div className='questItem'>
            <div className='questItemLeft'>
                <div className='questIcon'>
                    <img src={Ad} alt=""/>
                </div>
                <div className='questItemLeftContent'>
                    <p className='questTitle'>Watch an ad and earn points</p>
                    <p className='questSubtitle'>+200 points</p>
                </div>
            </div>
            <div className='questItemRight'>
                <button className='questBtn' onClick={showAd}>Watch!</button>
            </div>
        </div>
    );
};

export default AdsGramTask;
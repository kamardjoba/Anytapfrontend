import React from 'react';
import '../Css/Quests.css';
import telegram from'../IMG/telegram.svg';

<<<<<<< HEAD
const tgQuest = ({GoTg}) => {
=======
const tgQuest = () => {
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={telegram} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Telegram channel</p>
                <p className='questSubtitle'>+200 points</p>
            </div>
        </div>
        <div className='questItemRight'>
<<<<<<< HEAD
            <button className='questBtn' onClick={GoTg}>GO!</button>
=======
            <button className='questBtn'>GO!</button>
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b
        </div>
    </div>
  );
};

export default tgQuest;

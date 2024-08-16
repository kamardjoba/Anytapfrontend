import React from 'react';
import '../Css/Quests.css';
import arrows from'../IMG/arrows.svg';

<<<<<<< HEAD
const TonTrans = ({GoTon}) => {
=======
const TonTrans = () => {
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={arrows} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Make Ton transactions</p>
                <p className='questSubtitle'>+5000 Points</p>
            </div>
        </div>
        <div className='questItemRight'>
<<<<<<< HEAD
            <button className='questBtn' onClick={GoTon}>GO!</button>
=======
            <button className='questBtn'>GO!</button>
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b
        </div>
    </div>
  );
};

export default TonTrans;
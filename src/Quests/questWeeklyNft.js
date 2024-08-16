import React from 'react';
import '../Css/Quests.css';
import arrows from'../IMG/arrows.svg';

<<<<<<< HEAD
const WeeklyNft = ({GoWeekNft}) => {
=======
const WeeklyNft = () => {
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={arrows} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Mint Weekly NFT</p>
                <p className='questSubtitle'>+2500 Points and Weekly NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
<<<<<<< HEAD
            <button className='questBtn' onClick={GoWeekNft}>Mint</button>
=======
            <button className='questBtn'>Mint</button>
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b
        </div>
    </div>
  );
};

export default WeeklyNft;
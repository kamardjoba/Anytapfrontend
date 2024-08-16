import React from 'react';
import '../Css/Quests.css';
import invite from'../IMG/invite.svg';

<<<<<<< HEAD
const FrendsQuest = ({GoFrands}) => {
=======
const FrendsQuest = () => {
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={invite} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Invite 10 friends</p>
                <p className='questSubtitle'>+5000 Points and Referral NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
<<<<<<< HEAD
            <button className='questBtn' onClick={GoFrands}>Link</button>
=======
            <button className='questBtn'>Link</button>
>>>>>>> 343c316300705fcf4a7ac6c167d1b877b9b7126b
        </div>
    </div>
  );
};

export default FrendsQuest;
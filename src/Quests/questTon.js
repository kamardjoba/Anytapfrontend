import React from 'react';
import '../Css/Quests.css';
import arrows from'../IMG/arrows.svg';


const TonTrans = ({GoTon}) => {

const TonTrans = () => {


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

            <button className='questBtn' onClick={GoTon}>GO!</button>

            <button className='questBtn'>GO!</button>

        </div>
    </div>
  );
};
}

export default TonTrans;
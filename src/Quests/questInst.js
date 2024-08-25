import React from 'react';
import '../Css/Quests.css';


const InstQuest = ({GoInst, Inst_val, inst}) => {

  return (
    <div className='questItem'>
        <div className='questItemLeft'>
            <div className='questIcon'>
                <img src={inst} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Subscribe Instagram account</p>
                <p className='questSubtitle'>+200 points</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!Inst_val &&(<button className='questBtn' onClick={GoInst}>GO!</button>)}
        </div>
    </div>
  );
};

export default InstQuest;
